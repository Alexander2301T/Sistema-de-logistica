// Inicializar datos
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar datos en cero
    initializeData();
    
    // Inicializar navegación
    initNavigation();
    
    // Inicializar gráficos
    initCharts();
});

// Función para inicializar los datos
function initializeData() {
    // Datos de totales
    document.getElementById('total-distribuidores').textContent = "0";
    document.getElementById('total-ventas').textContent = "0";
    document.getElementById('total-inventario').textContent = "0";
    document.getElementById('total-ordenes').textContent = "0";
    document.getElementById('distributor-count-display').textContent = "0";
    
    // Tabla de datos recientes
    const recentDataBody = document.getElementById('recent-data-body');
    recentDataBody.innerHTML = `
        <tr>
            <td colspan="5" class="no-data">No hay datos disponibles</td>
        </tr>
    `;
}

// Función para manejar la navegación
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-links li');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Eliminar clase activa de todos los enlaces
            navLinks.forEach(item => item.classList.remove('active'));
            
            // Agregar clase activa al enlace seleccionado
            this.classList.add('active');
            
            // Obtener la sección a mostrar
            const sectionId = this.getAttribute('data-section');
            
            // Ocultar todas las secciones
            const sections = document.querySelectorAll('.section-content');
            sections.forEach(section => section.classList.remove('active'));
            
            // Mostrar la sección seleccionada
            document.getElementById(sectionId).classList.add('active');
        });
    });
}

// Función para inicializar los gráficos
function initCharts() {
    // Datos para los gráficos (todos en cero porque no hay datos)
    const ventasMeses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
    const ventasData = [0, 0, 0, 0, 0, 0];
    
    const zonasNombres = ['Norte', 'Sur', 'Este', 'Oeste', 'Centro'];
    const zonasData = [0, 0, 0, 0, 0];
    
    // Crear gráfico de ventas (Gráfico de barras)
    const ventasChart = document.getElementById('ventas-chart').getContext('2d');
    new Chart(ventasChart, {
        type: 'bar',
        data: {
            labels: ventasMeses,
            datasets: [{
                label: 'Ventas Mensuales',
                data: ventasData,
                backgroundColor: 'rgba(42, 113, 208, 0.7)',
                borderColor: 'rgba(42, 113, 208, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Cantidad'
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        }
    });
    
    // Crear gráfico de distribución por zona (Gráfico de pastel)
    const distribucionChart = document.getElementById('distribucion-chart').getContext('2d');
    new Chart(distribucionChart, {
        type: 'pie',
        data: {
            labels: zonasNombres,
            datasets: [{
                data: zonasData,
                backgroundColor: [
                    'rgba(42, 113, 208, 0.7)',
                    'rgba(231, 76, 60, 0.7)',
                    'rgba(39, 174, 96, 0.7)',
                    'rgba(243, 156, 18, 0.7)',
                    'rgba(142, 68, 173, 0.7)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.formattedValue;
                            return `${label}: ${value}%`;
                        }
                    }
                }
            }
        }
    });
}

// Función para cargar datos (simulación)
// Esta función podría conectarse a una API en una implementación real
function loadData() {
    // Este es un placeholder para la carga de datos desde un backend
    // En un sistema real, aquí se realizarían peticiones fetch o AJAX
    console.log("Función para cargar datos desde API");
}

// Función para simular la actualización de datos
function updateDashboard() {
    // Actualizar número de distribuidores
    const numDistribuidores = Math.floor(Math.random() * 20);
    document.getElementById('total-distribuidores').textContent = numDistribuidores;
    document.getElementById('distributor-count-display').textContent = numDistribuidores;
    
    // Actualizar otros valores
    document.getElementById('total-ventas').textContent = Math.floor(Math.random() * 10000);
    document.getElementById('total-inventario').textContent = Math.floor(Math.random() * 500);
    document.getElementById('total-ordenes').textContent = Math.floor(Math.random() * 50);
    
    // Actualizar la lista de distribuidores
    updateDistributorList(numDistribuidores);
    
    // Podríamos también actualizar los gráficos aquí
}

// Función para actualizar la lista de distribuidores
function updateDistributorList(count) {
    const distributorList = document.getElementById('distributor-list');
    
    if (count === 0) {
        distributorList.innerHTML = '<p class="no-data">No hay distribuidores disponibles</p>';
        return;
    }
    
    let distributorHTML = '';
    const zonas = ['Norte', 'Sur', 'Este', 'Oeste', 'Centro'];
    
    for (let i = 0; i < count; i++) {
        const randomZona = zonas[Math.floor(Math.random() * zonas.length)];
        const isActive = Math.random() > 0.3; // 70% de probabilidad de estar activo
        
        distributorHTML += `
            <div class="distributor-item">
                <i class="fas fa-user"></i>
                <div class="distributor-info">
                    <div class="distributor-name">Distribuidor ${i + 1}</div>
                    <div class="distributor-zone">Zona ${randomZona}</div>
                </div>
                <div class="status-indicator ${isActive ? 'active' : 'inactive'}"></div>
            </div>
        `;
    }
    
    distributorList.innerHTML = distributorHTML;
}

// Agregar botón para simular la carga de datos
document.addEventListener('DOMContentLoaded', function() {
    const updateBtn = document.querySelector('.action-btn:nth-child(2)');
    updateBtn.addEventListener('click', function() {
        updateDashboard();
    });
    
    const addBtn = document.querySelector('.action-btn:nth-child(1)');
    addBtn.addEventListener('click', function() {
        alert('Funcionalidad de agregar distribuidores no implementada');
    });
});