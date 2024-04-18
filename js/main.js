window.addEventListener('scroll', function() {
    let h1 = document.querySelector('.scroll-transition');
    let bounding = h1.getBoundingClientRect();
    if (bounding.top < 0) {
      h1.classList.add('scrolled');
    } else {
      h1.classList.remove('scrolled');
    }
  });

  window.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start');
    const audioPlayer = document.getElementById('audioPlayer');
    const sections = document.querySelectorAll('section[data-audio]');
    let currentSectionIndex = 0;
    let allowScroll = false;
  
    function preventScroll(e) {
      if (!allowScroll) {
        e.preventDefault();
      }
    }
  
    window.addEventListener('scroll', preventScroll, { passive: false });
    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
  
    function scrollToNextSection() {
      currentSectionIndex++;
  
      if (currentSectionIndex < sections.length) {
        const nextSection = sections[currentSectionIndex];
        nextSection.scrollIntoView({ behavior: 'smooth' });
  
        setTimeout(() => {
          allowScroll = true;
        }, 1000);
  
        const nextAudioSrc = nextSection.getAttribute('data-audio');
        playAudio(nextAudioSrc);
      }
    }
  
    audioPlayer.addEventListener('ended', scrollToNextSection);
  
    startButton.addEventListener('click', () => {
      allowScroll = false;
  
      const firstAudioSrc = sections[currentSectionIndex].getAttribute('data-audio');
      playAudio(firstAudioSrc);
    });
  
    function playAudio(src) {
      audioPlayer.src = src;
      audioPlayer.play().catch(error => console.error('Error playing audio:', error));
    }
  });

  window.addEventListener('scroll', function() {
    let startSection = document.querySelector('.start');
    let sidebar = document.querySelector('.sidebar');
    let startSectionTop = startSection.getBoundingClientRect().top;

    if (startSectionTop >= 0 && startSectionTop < window.innerHeight) {
        sidebar.classList.add('hide');
    } else {
        sidebar.classList.remove('hide');
    }
});