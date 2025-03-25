document.addEventListener('DOMContentLoaded', function() {
    const passwordInputs = document.querySelectorAll('.password-input');
    const toggleButtons = document.querySelectorAll('.toggle-password');

    toggleButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const passwordInput = passwordInputs[index];
            const eyeIcon = button.querySelector('.eye-icon');

            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                eyeIcon.classList.add('visible');
            } else {
                passwordInput.type = 'password';
                eyeIcon.classList.remove('visible');
            }

            passwordInput.focus();
        });
    });
});
