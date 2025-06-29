// Configuração das cores baseadas na identidade visual
const colors = {
    primary: '#1a1833',
    secondary: '#c53030',
    accent: '#2d3748',
    success: '#38a169',
    warning: '#d69e2e',
    info: '#3182ce',
    light: '#f7fafc',
    medium: '#e2e8f0'
};

// Configuração padrão dos gráficos
Chart.defaults.font.family = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
Chart.defaults.font.size = 12;
Chart.defaults.plugins.legend.position = 'bottom';
Chart.defaults.plugins.legend.labels.padding = 20;

// Função para criar gradiente
function createGradient(ctx, color1, color2) {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    return gradient;
}

// Gráfico de Consciência do Mercado
function createAwarenessChart() {
    const ctx = document.getElementById('awarenessChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [
                'Alta Consciência Regulatória',
                'Média Consciência de Diferenciais',
                'Baixa Consciência de Inovação',
                'Oportunidade de Educação'
            ],
            datasets: [{
                data: [85, 45, 25, 70],
                backgroundColor: [
                    colors.success,
                    colors.warning,
                    colors.secondary,
                    colors.info
                ],
                borderWidth: 3,
                borderColor: '#ffffff',
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        usePointStyle: true,
                        padding: 15,
                        font: {
                            size: 11
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                duration: 2000
            }
        }
    });
}

// Gráfico de Tamanho do Mercado
function createMarketChart() {
    const ctx = document.getElementById('marketChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [
                'Empresas 50-100 funcionários',
                'Empresas 100-500 funcionários',
                'Empresas 500+ funcionários',
                'Grandes Corporações'
            ],
            datasets: [{
                label: 'Número Estimado de Empresas',
                data: [3500, 2000, 400, 100],
                backgroundColor: [
                    colors.primary + '80',
                    colors.secondary + '80',
                    colors.info + '80',
                    colors.success + '80'
                ],
                borderColor: [
                    colors.primary,
                    colors.secondary,
                    colors.info,
                    colors.success
                ],
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.parsed.y + ' empresas';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: colors.medium
                    },
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString();
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        maxRotation: 45,
                        minRotation: 0
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutBounce'
            }
        }
    });
}

// Gráfico de ROI e Benefícios
function createROIChart() {
    const ctx = document.getElementById('roiChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Ano 1', 'Ano 2', 'Ano 3', 'Ano 4', 'Ano 5'],
            datasets: [{
                label: 'ROI Mínimo (R$ 2,20)',
                data: [2.2, 2.4, 2.6, 2.8, 3.0],
                borderColor: colors.warning,
                backgroundColor: colors.warning + '20',
                fill: true,
                tension: 0.4
            }, {
                label: 'ROI Máximo (R$ 6,00)',
                data: [6.0, 6.5, 7.0, 7.5, 8.0],
                borderColor: colors.success,
                backgroundColor: colors.success + '20',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Retorno (R$)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Período'
                    }
                }
            }
        }
    });
}

// Animações de entrada
function animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    // Observar cards e elementos
    document.querySelectorAll('.content-card, .trend-card, .opportunity-card, .market-stat').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Smooth scroll para navegação
function setupSmoothScroll() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contador animado para estatísticas
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = counter.textContent.replace(/[\d,]+/, target.toLocaleString());
                clearInterval(timer);
            } else {
                counter.textContent = counter.textContent.replace(/[\d,]+/, Math.floor(current).toLocaleString());
            }
        }, 20);
    });
}

// Efeito de hover nos cards
function setupCardHovers() {
    document.querySelectorAll('.content-card, .trend-card, .opportunity-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Navegação ativa
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Criar gráficos
    setTimeout(() => {
        createAwarenessChart();
        createMarketChart();
        createROIChart();
    }, 500);
    
    // Configurar animações e interações
    animateOnScroll();
    setupSmoothScroll();
    setupCardHovers();
    updateActiveNavigation();
    
    // Animar contadores quando visíveis
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    });
    
    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
        observer.observe(statsSection);
    }
});

// Adicionar classe ativa para navegação
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        background: var(--primary-color);
        color: white;
        transform: translateY(-2px);
    }
`;
document.head.appendChild(style);

