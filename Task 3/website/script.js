document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const productList = document.querySelectorAll('.add-to-cart');

    productList.forEach(button => {
        button.addEventListener('click', (e) => {
            const productItem = e.target.closest('.product-item');
            const productTitle = productItem.querySelector('.product-title').textContent;
            const productPrice = parseFloat(productItem.querySelector('.product-price').textContent.replace('$', ''));

            const existingProduct = cart.find(item => item.title === productTitle);

            if (existingProduct) {
                existingProduct.quantity += 1;
                existingProduct.totalPrice += productPrice;
            } else {
                cart.push({
                    title: productTitle,
                    price: productPrice,
                    quantity: 1,
                    totalPrice: productPrice
                });
            }

            renderCart();
        });
    });

    function renderCart() {
        const cartTableBody = document.querySelector('#cart-table tbody');
        cartTableBody.innerHTML = '';

        let totalItems = 0;
        let totalPrice = 0;

        cart.forEach(item => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${item.title}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>$${item.totalPrice.toFixed(2)}</td>
                <td><button class="btn remove-item">Remove</button></td>
            `;

            cartTableBody.appendChild(row);

            totalItems += item.quantity;
            totalPrice += item.totalPrice;
        });

        document.querySelector('#total-items').textContent = totalItems;
        document.querySelector('#total-price').textContent = totalPrice.toFixed(2);

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const productTitle = e.target.closest('tr').children[0].textContent;
                const productIndex = cart.findIndex(item => item.title === productTitle);

                if (productIndex !== -1) {
                    cart.splice(productIndex, 1);
                }

                renderCart();
            });
        });
    }

    document.querySelector('.checkout').addEventListener('click', () => {
        if (cart.length > 0) {
            alert('Checkout process initiated.');
            // Here you can add further functionality for checkout
        } else {
            alert('Your cart is empty.');
        }
    });
});
