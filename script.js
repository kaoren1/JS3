class Car {
    constructor(brand, color, year) {
        this.brand = brand;
        this.color = color;
        this.year = year;
    }

    // Метод для получения информации об автомобиле
    getInfo() {
        return `${this.brand} (${this.color}, ${this.year})`;
    }
}

// Получение элементов DOM
const objectsList = document.getElementById('objectsList');
const objectForm = document.getElementById('objectForm');
const brandInput = document.getElementById('brandInput');
const colorInput = document.getElementById('colorInput');
const yearInput = document.getElementById('yearInput');

let cars = []; // Массив для хранения объектов автомобилей

// Обработка отправки формы
objectForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const brand = brandInput.value.trim();
    const color = colorInput.value.trim();
    const year = yearInput.value.trim();

    const newCar = new Car(brand, color, year);
    cars.push(newCar);
    renderCars();

    // Очистка полей ввода
    brandInput.value = '';
    colorInput.value = '';
    yearInput.value = '';
});

// Функция для отображения списка автомобилей
function renderCars() {
    objectsList.innerHTML = ''; // Очистка списка

    cars.forEach((car, index) => {
        const carDiv = document.createElement('div');
        carDiv.classList.add('car-item', 'p-2', 'mb-2', 'border', 'rounded'); // Bootstrap классы
        carDiv.innerHTML = `
            <strong>${car.getInfo()}</strong>
            <div class="mt-2">
                <button class="btn btn-sm btn-danger" onclick="deleteCar(${index})">Удалить</button>
                <button class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#updateModal" data-car-index="${index}">Изменить</button>
            </div>
        `;
        objectsList.appendChild(carDiv);
    });
}

// Функция для удаления автомобиля
function deleteCar(index) {
    cars.splice(index, 1);
    renderCars();
}

// Модальное окно для редактирования
const updateModal = document.getElementById('updateModal');
const updateBrandInput = document.getElementById('updateBrandInput');
const updateColorInput = document.getElementById('updateColorInput');
const updateYearInput = document.getElementById('updateYearInput');

updateModal.addEventListener('show.bs.modal', (event) => {
    const button = event.relatedTarget;
    const index = button.dataset.carIndex;
    const car = cars[index];

    updateBrandInput.value = car.brand;
    updateColorInput.value = car.color;
    updateYearInput.value = car.year;

    // Обработка сохранения изменений
    const saveButton = updateModal.querySelector('.btn-primary');
    saveButton.onclick = () => {
        car.brand = updateBrandInput.value;
        car.color = updateColorInput.value;
        car.year = updateYearInput.value;
        renderCars();
        updateModal.hide();
    };
});
