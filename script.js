(function() {
    const modal = document.getElementById('booking-modal');
    const openBtn = document.getElementById('open-booking-btn');
    const closeBtn = document.querySelector('.close-btn');
    const form = document.getElementById('booking-form');
    const messageDiv = document.getElementById('form-message');

    // Открыть модальное окно
    openBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    // Закрыть по крестику
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        // Сбросить сообщение при закрытии
        messageDiv.style.display = 'none';
        form.reset();
    });

    // Закрыть при клике вне окна
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            messageDiv.style.display = 'none';
            form.reset();
        }
    });

    // Отправка формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const booking = {
            name: form.name.value.trim(),
            email: form.email.value.trim(),
            phone: form.phone.value.trim(),
            date: form.date.value,
            time: form.time.value,
            guests: form.guests.value,
            timestamp: new Date().toISOString()
        };

        // Сохраняем в localStorage
        let bookings = JSON.parse(localStorage.getItem('museumBookings')) || [];
        bookings.push(booking);
        localStorage.setItem('museumBookings', JSON.stringify(bookings));

        // Показываем сообщение об успехе
        messageDiv.textContent = `✅ Спасибо, ${booking.name}! Вы записаны на ${booking.date} в ${booking.time}. Гостей: ${booking.guests}.`;
        messageDiv.className = 'form-message success';
        messageDiv.style.display = 'block';

        // Очищаем форму
        form.reset();

        // Автоматически закрываем окно через 3 секунды
        setTimeout(() => {
            modal.style.display = 'none';
            messageDiv.style.display = 'none';
        }, 3000);
    });
})();