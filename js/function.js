/** * Ejecutar la lógica una vez que el DOM esté completamente cargado 
 */
document.addEventListener('DOMContentLoaded', () => {
    
    // --- OBTENER REFERENCIAS DEL MENÚ LATERAL ---
    const openMenuBtn = document.getElementById('open-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const sideMenu = document.getElementById('side-menu');

    // --- OBTENER REFERENCIAS DEL CARRITO ---
    const openCartBtn = document.getElementById('open-cart-btn');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const cartMenu = document.getElementById('cart-menu');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartBadge = document.getElementById('cart-badge');
    const addToCartBtns = document.querySelectorAll('.add-to-cart');

    // --- GESTIONAR APERTURA Y CIERRE DEL MENÚ ---
    // Añadir la clase 'open' para mostrar el menú lateral
    openMenuBtn.addEventListener('click', () => {
        sideMenu.classList.add('open');
    });

    // Remover la clase 'open' para ocultar el menú lateral
    closeMenuBtn.addEventListener('click', () => {
        sideMenu.classList.remove('open');
    });

    // --- GESTIONAR APERTURA Y CIERRE DEL CARRITO ---
    // Añadir la clase 'open' para mostrar el panel del carrito
    openCartBtn.addEventListener('click', () => {
        cartMenu.classList.add('open');
    });

    // Remover la clase 'open' para ocultar el panel del carrito
    closeCartBtn.addEventListener('click', () => {
        cartMenu.classList.remove('open');
    });

    // --- PROCESAR LA ADICIÓN DE PRODUCTOS ---
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Extraer información del producto desde los atributos 'data'
            const name = e.target.getAttribute('data-name');
            const price = e.target.getAttribute('data-price');
            const img = e.target.getAttribute('data-img');

            // Crear un nuevo elemento div para representar el producto en el carrito
            const cartItem = document.createElement('div');
            cartItem.innerHTML = `
                <img src="${img}" alt="${name}">
                <p>${name}</p>
                <p>${price}</p>
                <i><img src="img/trash.png" alt="Icono Quitar" class="delete-icon hover-effect"></i>
            `;

            // Insertar el nuevo producto en el contenedor del carrito
            cartItemsContainer.appendChild(cartItem);

            // Refrescar el contador del badge circular
            updateCartBadge();
        });
    });

    // --- PROCESAR LA ELIMINACIÓN DE PRODUCTOS (DELEGACIÓN DE EVENTOS) ---
    cartItemsContainer.addEventListener('click', (e) => {
        // Identificar si el clic ocurrió en el icono de eliminar
        if (e.target.classList.contains('delete-icon')) {
            // Localizar y remover el elemento contenedor del producto
            e.target.closest('div').remove();
            
            // Refrescar el contador del badge circular
            updateCartBadge();
        }
    });

    // --- ACTUALIZAR EL CONTADOR VISUAL DEL CARRITO ---
    function updateCartBadge() {
        // Contar la cantidad de hijos (productos) en el contenedor
        const totalItems = cartItemsContainer.children.length;
        // Asignar el valor numérico al elemento HTML del badge
        cartBadge.textContent = totalItems;
    }
});