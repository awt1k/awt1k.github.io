const canvas = document.getElementById('snowCanvas');
        const ctx = canvas.getContext('2d');

        // Настройка размеров canvas
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Массив для хранения снежинок
        const snowflakes = [];

        // Класс для снежинки
        class Snowflake {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.radius = Math.random() * 3 + 1; // Размер от 1 до 4
                this.speedY = Math.random() * 2 + 1; // Скорость падения
                this.speedX = Math.random() * 2 - 1; // Легкое колебание по X
                this.opacity = Math.random() * 0.5 + 0.3; // Прозрачность от 0.3 до 0.8
            }

            update() {
                this.y += this.speedY;
                this.x += this.speedX;

                // Если снежинка вышла за пределы экрана, возвращаем её наверх
                if (this.y > canvas.height) {
                    this.y = 0;
                    this.x = Math.random() * canvas.width;
                }
            }

            draw() {
                ctx.beginPath();
                // Добавляем эффект свечения
                ctx.shadowBlur = 5; // Радиус размытия свечения
                ctx.shadowColor = 'rgb(255, 255, 255)'; // Белое свечение с прозрачностью
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.fill();
                ctx.closePath();
                // Сбрасываем свечение, чтобы не влиять на другие элементы
                ctx.shadowBlur = 0;
                ctx.shadowColor = 'transparent';
            }
        }

        // Создаем 100 снежинок
        for (let i = 0; i < 100; i++) {
            snowflakes.push(new Snowflake());
        }

        // Анимация
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            snowflakes.forEach(snowflake => {
                snowflake.update();
                snowflake.draw();
            });
            requestAnimationFrame(animate);
        }

        // Обработка изменения размера окна
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        // Запуск анимации
        animate();