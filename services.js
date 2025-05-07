document.querySelector('.get-in-touch-btn').addEventListener('click', () => {
    alert('Get in Touch button clicked! This can open a contact form.');
  });
  
  const sidebar = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('toggleSidebarBtn');
  const servicesSection = document.getElementById('servicesSection');
  const header = document.querySelector('header');
  
  function toggleSidebar() {
    sidebar.classList.toggle('active');
    if (sidebar.classList.contains('active')) {
      servicesSection.style.marginLeft = '180px';
      header.style.marginLeft = '180px';
      toggleBtn.textContent = '✕';
    } else {
      servicesSection.style.marginLeft = '0';
      header.style.marginLeft = '0';
      toggleBtn.textContent = '☰';
    }
  }
  
  toggleBtn.addEventListener('click', toggleSidebar);
  
  // Toggle category content
  const categoryTags = document.querySelectorAll('.category-tag');
  categoryTags.forEach(tag => {
    tag.addEventListener('click', () => {
      const content = tag.querySelector('.category-content');
      // Hide all other content
      document.querySelectorAll('.category-content').forEach(c => {
        if (c !== content) {
          c.classList.remove('active');
        }
      });
      // Toggle the clicked content
      content.classList.toggle('active');
    });
  });
  
  // Particle Animation
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const particlesArray = [];
  const numberOfParticles = 100;
  
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = Math.random() * 1 - 0.5;
    }
  
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
  
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
  
    draw() {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  function initParticles() {
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }
  }
  
  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();
  
      for (let j = i; j < particlesArray.length; j++) {
        const dx = particlesArray[i].x - particlesArray[j].x;
        const dy = particlesArray[i].y - particlesArray[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 100})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
          ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animateParticles);
  }
  
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
  
  initParticles();
  animateParticles();