import { useState, useEffect, useCallback } from "react";

// ─── CONFIG ────────────────────────────────────────────────────────────────
const AIRTABLE_BASE_ID = "recblFFQ763yZmE7i";
const AIRTABLE_API_KEY = "patsA8wI9IXhzjFCq.582012d276ee9da8da57203eb1d3ebd38bdc4442ffaa795c7733b22e34ddb9d5";
const AIRTABLE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}`;

// ─── TRANSLATIONS ───────────────────────────────────────────────────────────
const translations = {
  kz: {
    appName: "Дастархан",
    appTagline: "Дәстүрлі қазақ мейрамханасы",
    home: "Басты бет",
    menu: "Мәзір",
    reservation: "Брондау",
    banquet: "Банкет",
    admin: "Әкімші",
    heroTitle: "Сізді тамаша кешке шақырамыз",
    heroSubtitle: "Дәстүрлі дәм, заманауи атмосфера — арнайы сіз үшін",
    bookTable: "Үстел броньдау",
    bookBanquet: "Банкет броньдау",
    step1: "Зал таңдау",
    step2: "Күн және уақыт",
    step3: "Үстел таңдау",
    step4: "Қонақ туралы мәлімет",
    step5: "Растау",
    vipHall: "ВИП залы",
    mainHall: "Негізгі зал",
    gardenHall: "Бақша залы",
    banquetHall: "Банкет залы",
    vipDesc: "Жеке кабинеттер, премиум сервис, эксклюзивті атмосфера",
    mainDesc: "Кең зал, отбасылық кештерге ыңғайлы",
    gardenDesc: "Ашық аспан астында, жасыл бақша ортасында",
    paid: "Ақылы",
    free: "Тегін",
    selectDate: "Күнді таңдаңыз",
    selectTime: "Уақытты таңдаңыз",
    tablesAvailable: "үстел бос",
    fullyBooked: "Толды",
    selectTable: "Үстелді таңдаңыз",
    seats: "орын",
    booked: "Броньделген",
    bookedUntil: "Дейін броньделген",
    guestInfo: "Қонақ туралы мәлімет",
    fullName: "Толық аты-жөні",
    phone: "Телефон нөмірі",
    email: "Электрондық пошта",
    numGuests: "Қонақтар саны",
    comments: "Ерекше сұраулар",
    preOrder: "Алдын-ала тапсырыс",
    preOrderOptional: "Алдын-ала тапсырыс (міндетті емес)",
    addToOrder: "Қосу",
    subtotal: "Аралық сома",
    confirmBooking: "Броньдауды растау",
    bookingSuccess: "Броньдау сәтті расталды!",
    bookingRef: "Броньдау нөмірі",
    newBooking: "Жаңа броньдау",
    hallLabel: "Зал",
    dateLabel: "Күн",
    timeLabel: "Уақыт",
    tableLabel: "Үстел",
    totalLabel: "Жалпы",
    banquetTitle: "Банкет броньдау",
    banquetDesc: "Мерейтой, корпоратив немесе кез-келген ерекше іс-шара үшін",
    eventName: "Іс-шара атауы",
    contactName: "Байланыс адамы",
    guestsCount: "Қонақтар саны",
    menuType: "Мәзір түрі",
    standard: "Стандарт",
    premium: "Премиум",
    vip: "ВИП",
    perPerson: "адам/теңге",
    startTime: "Басталу уақыты",
    duration: "Ұзақтығы",
    hours: "сағат",
    specialRequests: "Ерекше сұраулар",
    totalPrice: "Жалпы баға",
    submitBanquet: "Банкет броньдау",
    banquetSuccess: "Банкет сәтті броньделді!",
    minGuests: "Ең аз 20 қонақ",
    maxGuests: "Ең көп 200 қонақ",
    adminLogin: "Әкімші кіру",
    login: "Кіру",
    logout: "Шығу",
    username: "Пайдаланушы аты",
    password: "Құпия сөз",
    loginError: "Қате логин немесе құпия сөз",
    menuManagement: "Мәзірді басқару",
    reservationsList: "Броньдаулар тізімі",
    banquetsList: "Банкеттер тізімі",
    addDish: "Тағам қосу",
    dishName: "Тағам атауы",
    description: "Сипаттамасы",
    price: "Бағасы",
    category: "Санаты",
    imageUrl: "Сурет URL",
    available: "Қол жетімді",
    save: "Сақтау",
    cancel: "Болдырмау",
    edit: "Өңдеу",
    delete: "Жою",
    deleteConfirm: "Жою туралы сенімдісіз бе?",
    filterByDate: "Күн бойынша сүзу",
    upcoming: "Алдағы",
    past: "Өткен",
    status: "Күй",
    next: "Келесі",
    back: "Артқа",
    loading: "Жүктелуде...",
    required: "Міндетті өріс",
    phoneFormat: "Формат: +7XXXXXXXXXX",
    phoneTooShort: "Телефон нөмірі 11 санды болуы керек",
    guestsTooMany: "Қонақтар саны үстел сыйымдылығынан артық",
    errorSaving: "Сақтау кезінде қате пайда болды",
    noRecords: "Жазба жоқ",
    all: "Барлығы",
    menuHeroTitle: "Біздің мәзір",
    menuHeroSub: "Дәстүрлі дәм, заманауи берілу",
    noDishesInCategory: "Бұл санатта тағам жоқ",
    january: "Қаңтар", february: "Ақпан", march: "Наурыз", april: "Сәуір",
    may: "Мамыр", june: "Маусым", july: "Шілде", august: "Тамыз",
    september: "Қыркүйек", october: "Қазан", november: "Қараша", december: "Желтоқсан",
    mon: "Дс", tue: "Сс", wed: "Ср", thu: "Бс", fri: "Жм", sat: "Сб", sun: "Жс",
  },
  ru: {
    appName: "Дастархан",
    appTagline: "Традиционный казахский ресторан",
    home: "Главная",
    menu: "Меню",
    reservation: "Бронирование",
    banquet: "Банкет",
    admin: "Админ",
    heroTitle: "Приглашаем вас на незабываемый вечер",
    heroSubtitle: "Традиционный вкус, современная атмосфера — специально для вас",
    bookTable: "Забронировать стол",
    bookBanquet: "Забронировать банкет",
    step1: "Выбор зала",
    step2: "Дата и время",
    step3: "Выбор стола",
    step4: "Данные гостя",
    step5: "Подтверждение",
    vipHall: "ВИП зал",
    mainHall: "Основной зал",
    gardenHall: "Садовый зал",
    banquetHall: "Банкетный зал",
    vipDesc: "Приватные кабинеты, премиум сервис, эксклюзивная атмосфера",
    mainDesc: "Просторный зал, идеально для семейных вечеров",
    gardenDesc: "Под открытым небом, в окружении зелёного сада",
    paid: "Платный",
    free: "Бесплатно",
    selectDate: "Выберите дату",
    selectTime: "Выберите время",
    tablesAvailable: "стола свободно",
    fullyBooked: "Занято",
    selectTable: "Выберите стол",
    seats: "мест",
    booked: "Забронировано",
    bookedUntil: "Забронировано до",
    guestInfo: "Данные гостя",
    fullName: "Полное имя",
    phone: "Номер телефона",
    email: "Электронная почта",
    numGuests: "Количество гостей",
    comments: "Особые пожелания",
    preOrder: "Предзаказ",
    preOrderOptional: "Предзаказ блюд (необязательно)",
    addToOrder: "Добавить",
    subtotal: "Промежуточный итог",
    confirmBooking: "Подтвердить бронирование",
    bookingSuccess: "Бронирование успешно подтверждено!",
    bookingRef: "Номер бронирования",
    newBooking: "Новое бронирование",
    hallLabel: "Зал",
    dateLabel: "Дата",
    timeLabel: "Время",
    tableLabel: "Стол",
    totalLabel: "Итого",
    banquetTitle: "Бронирование банкета",
    banquetDesc: "Юбилей, корпоратив или любое особое мероприятие",
    eventName: "Название мероприятия",
    contactName: "Контактное лицо",
    guestsCount: "Количество гостей",
    menuType: "Тип меню",
    standard: "Стандарт",
    premium: "Премиум",
    vip: "ВИП",
    perPerson: "чел/тенге",
    startTime: "Время начала",
    duration: "Продолжительность",
    hours: "часов",
    specialRequests: "Особые пожелания",
    totalPrice: "Итоговая стоимость",
    submitBanquet: "Забронировать банкет",
    banquetSuccess: "Банкет успешно забронирован!",
    minGuests: "Минимум 20 гостей",
    maxGuests: "Максимум 200 гостей",
    adminLogin: "Вход для администратора",
    login: "Войти",
    logout: "Выйти",
    username: "Имя пользователя",
    password: "Пароль",
    loginError: "Неверный логин или пароль",
    menuManagement: "Управление меню",
    reservationsList: "Список бронирований",
    banquetsList: "Список банкетов",
    addDish: "Добавить блюдо",
    dishName: "Название блюда",
    description: "Описание",
    price: "Цена",
    category: "Категория",
    imageUrl: "URL фото",
    available: "Доступно",
    save: "Сохранить",
    cancel: "Отмена",
    edit: "Редактировать",
    delete: "Удалить",
    deleteConfirm: "Вы уверены, что хотите удалить?",
    filterByDate: "Фильтр по дате",
    upcoming: "Предстоящие",
    past: "Прошедшие",
    status: "Статус",
    next: "Далее",
    back: "Назад",
    loading: "Загрузка...",
    required: "Обязательное поле",
    phoneFormat: "Формат: +7XXXXXXXXXX",
    phoneTooShort: "Номер телефона должен содержать 11 цифр",
    guestsTooMany: "Количество гостей превышает вместимость стола",
    errorSaving: "Ошибка при сохранении",
    noRecords: "Нет записей",
    all: "Все",
    menuHeroTitle: "Наше меню",
    menuHeroSub: "Традиционный вкус, современная подача",
    noDishesInCategory: "В этой категории нет блюд",
    january: "Январь", february: "Февраль", march: "Март", april: "Апрель",
    may: "Май", june: "Июнь", july: "Июль", august: "Август",
    september: "Сентябрь", october: "Октябрь", november: "Ноябрь", december: "Декабрь",
    mon: "Пн", tue: "Вт", wed: "Ср", thu: "Чт", fri: "Пт", sat: "Сб", sun: "Вс",
  },
};

// ─── HALL DATA ───────────────────────────────────────────────────────────────
const HALLS = [
  {
    id: "vip", nameKey: "vipHall", descKey: "vipDesc", paid: true,
    tables: [
      { num: 1, seats: 2 }, { num: 2, seats: 4 }, { num: 3, seats: 2 },
      { num: 4, seats: 4 }, { num: 5, seats: 3 }, { num: 6, seats: 4 },
    ],
  },
  {
    id: "main", nameKey: "mainHall", descKey: "mainDesc", paid: false,
    tables: [
      { num: 1, seats: 4 }, { num: 2, seats: 6 }, { num: 3, seats: 2 },
      { num: 4, seats: 4 }, { num: 5, seats: 6 }, { num: 6, seats: 2 },
      { num: 7, seats: 4 }, { num: 8, seats: 6 }, { num: 9, seats: 2 }, { num: 10, seats: 4 },
    ],
  },
  {
    id: "garden", nameKey: "gardenHall", descKey: "gardenDesc", paid: false,
    tables: [
      { num: 1, seats: 2 }, { num: 2, seats: 4 }, { num: 3, seats: 4 },
      { num: 4, seats: 2 }, { num: 5, seats: 4 }, { num: 6, seats: 3 },
      { num: 7, seats: 2 }, { num: 8, seats: 4 },
    ],
  },
];

const TIME_SLOTS = ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"];
const BANQUET_MENU_PRICES = { standard: 10000, premium: 20000, vip: 30000 };

function addHours(time, h) {
  const [hh, mm] = time.split(":").map(Number);
  return `${String(hh + h).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

function genRef() {
  return Math.random().toString(36).substr(2, 6).toUpperCase();
}

// ─── AIRTABLE HELPERS ────────────────────────────────────────────────────────
async function airtableFetch(table, params = {}) {
  const query = new URLSearchParams();
  if (params.filterByFormula) query.set("filterByFormula", params.filterByFormula);
  if (params.sort) query.set("sort[0][field]", params.sort);
  const res = await fetch(`${AIRTABLE_URL}/${table}?${query}`, {
    headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
  });
  const data = await res.json();
  return data.records || [];
}

async function airtableCreate(table, fields) {
  const res = await fetch(`${AIRTABLE_URL}/${table}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fields }),
  });
  return res.json();
}

async function airtableUpdate(table, id, fields) {
  const res = await fetch(`${AIRTABLE_URL}/${table}/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fields }),
  });
  return res.json();
}

async function airtableDelete(table, id) {
  const res = await fetch(`${AIRTABLE_URL}/${table}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
  });
  return res.json();
}

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
function GlobalStyles() {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Mulish:wght@300;400;500;600;700&display=swap');

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

      :root {
        --primary: #2D6A4F;
        --primary-dark: #1B4332;
        --accent: #74C69D;
        --accent-light: #B7E4C7;
        --bg: #F4F6F0;
        --card: #FFFFFF;
        --danger: #E63946;
        --success: #52B788;
        --text: #1A1A2E;
        --text-muted: #6B7280;
        --border: #E5E7EB;
        --shadow: 0 4px 24px rgba(45,106,79,0.10);
        --shadow-lg: 0 8px 40px rgba(45,106,79,0.16);
        --radius: 16px;
        --radius-sm: 8px;
      }

      html { scroll-behavior: smooth; }

      body {
        font-family: 'Mulish', sans-serif;
        background: var(--bg);
        color: var(--text);
        min-height: 100vh;
        line-height: 1.6;
      }

      h1, h2, h3, h4 {
        font-family: 'Cormorant Garamond', serif;
        line-height: 1.2;
        color: var(--primary-dark);
      }

      /* NAVBAR */
      .navbar {
        position: sticky; top: 0; z-index: 100;
        background: rgba(255,255,255,0.96);
        backdrop-filter: blur(12px);
        border-bottom: 1px solid var(--accent-light);
        padding: 0 24px;
        height: 72px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0 2px 16px rgba(45,106,79,0.08);
      }
      .navbar-brand {
        display: flex; flex-direction: column;
        text-decoration: none;
        cursor: pointer;
      }
      .navbar-brand .brand-name {
        font-family: 'Cormorant Garamond', serif;
        font-size: 1.6rem; font-weight: 700;
        color: var(--primary-dark);
        letter-spacing: 0.02em;
      }
      .navbar-brand .brand-tagline {
        font-size: 0.68rem; color: var(--text-muted);
        letter-spacing: 0.08em; text-transform: uppercase;
      }
      .navbar-links {
        display: flex; align-items: center; gap: 8px;
        list-style: none;
      }
      .nav-link {
        padding: 8px 14px;
        border-radius: var(--radius-sm);
        cursor: pointer;
        font-weight: 500; font-size: 0.9rem;
        color: var(--text-muted);
        transition: all 0.2s;
        border: none; background: none;
      }
      .nav-link:hover, .nav-link.active {
        color: var(--primary);
        background: var(--accent-light);
      }
      .lang-btn {
        padding: 5px 12px;
        border-radius: 20px;
        border: 1.5px solid var(--accent);
        background: none; cursor: pointer;
        font-size: 0.78rem; font-weight: 700;
        color: var(--primary); transition: all 0.2s;
        letter-spacing: 0.05em;
      }
      .lang-btn.active {
        background: var(--primary); color: #fff; border-color: var(--primary);
      }
      .hamburger {
        display: none; flex-direction: column; gap: 5px;
        cursor: pointer; padding: 8px; border: none; background: none;
      }
      .hamburger span {
        display: block; width: 24px; height: 2px;
        background: var(--primary); border-radius: 2px;
        transition: all 0.3s;
      }
      .mobile-menu {
        display: none; position: fixed; top: 72px; left: 0; right: 0;
        background: #fff; z-index: 99; padding: 16px 24px;
        border-bottom: 1px solid var(--border);
        flex-direction: column; gap: 4px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.1);
      }
      .mobile-menu.open { display: flex; }
      .mobile-menu .nav-link { width: 100%; text-align: left; padding: 12px 16px; }

      /* HERO */
      .hero {
        min-height: 88vh;
        background: linear-gradient(135deg, #1B4332 0%, #2D6A4F 50%, #40916C 100%);
        display: flex; align-items: center; justify-content: center;
        position: relative; overflow: hidden;
        padding: 60px 24px;
      }
      .hero::before {
        content: '';
        position: absolute; inset: 0;
        background: url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 L55 20 L55 40 L30 55 L5 40 L5 20 Z' fill='none' stroke='rgba(255,255,255,0.04)' stroke-width='1'/%3E%3C/svg%3E");
        background-size: 60px 60px;
      }
      .hero-content {
        text-align: center; max-width: 720px; position: relative; z-index: 1;
      }
      .hero-badge {
        display: inline-block;
        padding: 6px 20px;
        background: rgba(116,198,157,0.2);
        border: 1px solid rgba(116,198,157,0.4);
        border-radius: 40px;
        color: var(--accent);
        font-size: 0.78rem; letter-spacing: 0.12em; text-transform: uppercase;
        font-weight: 700; margin-bottom: 24px;
      }
      .hero h1 {
        font-size: clamp(2.4rem, 6vw, 4rem);
        color: #fff; margin-bottom: 20px;
        font-weight: 600; line-height: 1.15;
      }
      .hero p {
        font-size: 1.15rem; color: rgba(255,255,255,0.75);
        margin-bottom: 40px; font-weight: 300;
      }
      .hero-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
      .btn {
        padding: 14px 32px; border-radius: 50px;
        font-family: 'Mulish', sans-serif;
        font-weight: 700; font-size: 0.95rem;
        cursor: pointer; border: none; transition: all 0.25s;
        letter-spacing: 0.03em;
        display: inline-flex; align-items: center; gap: 8px;
      }
      .btn-primary {
        background: var(--accent); color: var(--primary-dark);
        box-shadow: 0 4px 20px rgba(116,198,157,0.4);
      }
      .btn-primary:hover {
        background: #fff; transform: translateY(-2px);
        box-shadow: 0 8px 30px rgba(116,198,157,0.5);
      }
      .btn-outline {
        background: transparent; color: #fff;
        border: 2px solid rgba(255,255,255,0.4);
      }
      .btn-outline:hover {
        background: rgba(255,255,255,0.1);
        border-color: rgba(255,255,255,0.7);
      }
      .btn-green {
        background: var(--primary); color: #fff;
        box-shadow: 0 4px 16px rgba(45,106,79,0.3);
      }
      .btn-green:hover { background: var(--primary-dark); transform: translateY(-1px); }
      .btn-danger { background: var(--danger); color: #fff; }
      .btn-danger:hover { background: #c0392b; }
      .btn-ghost {
        background: var(--bg); color: var(--text);
        border: 1.5px solid var(--border);
      }
      .btn-ghost:hover { background: var(--accent-light); border-color: var(--accent); }
      .btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none !important; }
      .btn-sm { padding: 8px 18px; font-size: 0.82rem; }
      .btn-xs { padding: 5px 12px; font-size: 0.78rem; }

      /* CONTAINER */
      .container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }
      .section { padding: 64px 0; }

      /* CARD */
      .card {
        background: var(--card);
        border-radius: var(--radius);
        box-shadow: var(--shadow);
        overflow: hidden;
      }
      .card-body { padding: 28px; }
      .card-header {
        padding: 20px 28px;
        border-bottom: 1px solid var(--border);
      }

      /* STEP WIZARD */
      .wizard-container { max-width: 840px; margin: 0 auto; padding: 40px 24px; }
      .step-bar {
        display: flex; align-items: center; margin-bottom: 40px;
        gap: 0;
      }
      .step-item {
        display: flex; flex-direction: column; align-items: center;
        flex: 1; position: relative;
      }
      .step-item:not(:last-child)::after {
        content: '';
        position: absolute; top: 18px; left: 50%; width: 100%; height: 2px;
        background: var(--border); z-index: 0;
      }
      .step-item.done:not(:last-child)::after,
      .step-item.active:not(:last-child)::after { background: var(--accent); }
      .step-circle {
        width: 36px; height: 36px; border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        font-weight: 700; font-size: 0.85rem;
        background: var(--border); color: var(--text-muted);
        position: relative; z-index: 1; transition: all 0.3s;
      }
      .step-item.active .step-circle {
        background: var(--primary); color: #fff;
        box-shadow: 0 0 0 4px var(--accent-light);
      }
      .step-item.done .step-circle { background: var(--success); color: #fff; }
      .step-label {
        font-size: 0.72rem; margin-top: 6px; color: var(--text-muted);
        font-weight: 600; text-align: center;
        letter-spacing: 0.04em; text-transform: uppercase;
      }
      .step-item.active .step-label { color: var(--primary); }

      /* HALL CARDS */
      .hall-grid {
        display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 20px; margin-top: 24px;
      }
      .hall-card {
        background: var(--card); border-radius: var(--radius);
        padding: 28px; cursor: pointer;
        border: 2px solid transparent;
        box-shadow: var(--shadow);
        transition: all 0.25s; position: relative;
      }
      .hall-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
      .hall-card.selected { border-color: var(--primary); background: #f0faf5; }
      .hall-icon {
        width: 52px; height: 52px; border-radius: 14px;
        background: var(--accent-light);
        display: flex; align-items: center; justify-content: center;
        font-size: 1.6rem; margin-bottom: 16px;
      }
      .hall-card h3 { font-size: 1.25rem; margin-bottom: 8px; }
      .hall-card p { font-size: 0.88rem; color: var(--text-muted); margin-bottom: 12px; }
      .badge {
        display: inline-block; padding: 3px 12px; border-radius: 20px;
        font-size: 0.72rem; font-weight: 700; letter-spacing: 0.06em;
      }
      .badge-paid { background: #FEF3C7; color: #92400E; }
      .badge-free { background: var(--accent-light); color: var(--primary-dark); }
      .badge-cat {
        background: var(--accent-light); color: var(--primary-dark);
        padding: 3px 10px; border-radius: 20px;
        font-size: 0.72rem; font-weight: 700; letter-spacing: 0.04em;
        display: inline-block;
      }

      /* CALENDAR */
      .calendar-wrap { background: var(--card); border-radius: var(--radius); box-shadow: var(--shadow); overflow: hidden; }
      .cal-header {
        display: flex; align-items: center; justify-content: space-between;
        padding: 20px 24px;
        background: var(--primary); color: #fff;
      }
      .cal-header h3 { font-family: 'Mulish', sans-serif; font-weight: 700; font-size: 1rem; color: #fff; }
      .cal-nav {
        background: rgba(255,255,255,0.15); border: none; color: #fff;
        width: 32px; height: 32px; border-radius: 8px;
        cursor: pointer; font-size: 1rem; transition: all 0.2s;
        display: flex; align-items: center; justify-content: center;
      }
      .cal-nav:hover { background: rgba(255,255,255,0.3); }
      .cal-grid { display: grid; grid-template-columns: repeat(7,1fr); padding: 16px; gap: 4px; }
      .cal-day-label {
        text-align: center; font-size: 0.72rem; font-weight: 700;
        color: var(--text-muted); padding: 8px 0;
        letter-spacing: 0.06em; text-transform: uppercase;
      }
      .cal-day {
        aspect-ratio: 1; display: flex; align-items: center; justify-content: center;
        border-radius: 10px; cursor: pointer; font-size: 0.88rem; font-weight: 500;
        transition: all 0.15s; border: none; background: none; color: var(--text);
      }
      .cal-day:hover:not(:disabled) { background: var(--accent-light); }
      .cal-day.today { font-weight: 700; color: var(--primary); border: 2px solid var(--accent); }
      .cal-day.selected { background: var(--primary); color: #fff; }
      .cal-day:disabled { color: #D1D5DB; cursor: default; }
      .cal-day.booked-banquet { background: #FEE2E2; color: var(--danger); }

      /* TIME SLOTS */
      .timeslots { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 12px; margin-top: 16px; }
      .timeslot-btn {
        padding: 14px 10px; border-radius: 12px;
        border: 2px solid var(--border); background: var(--card);
        cursor: pointer; text-align: center; transition: all 0.2s;
      }
      .timeslot-btn:hover:not(:disabled) { border-color: var(--primary); background: #f0faf5; }
      .timeslot-btn.selected { border-color: var(--primary); background: var(--primary); color: #fff; }
      .timeslot-btn.selected .slot-avail { color: var(--accent-light); }
      .timeslot-btn:disabled { opacity: 0.4; cursor: not-allowed; }
      .slot-time { font-weight: 700; font-size: 1rem; margin-bottom: 4px; }
      .slot-avail { font-size: 0.75rem; color: var(--text-muted); }

      /* TABLE MAP */
      .table-map { display: grid; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); gap: 14px; margin-top: 16px; }
      .table-box {
        padding: 16px 10px; border-radius: 14px; cursor: pointer;
        text-align: center; transition: all 0.2s; border: 2px solid transparent;
        position: relative;
      }
      .table-box.free { background: #D8F3DC; border-color: #52B788; }
      .table-box.free:hover { transform: scale(1.04); box-shadow: 0 4px 16px rgba(82,183,136,0.3); }
      .table-box.booked { background: #FFE4E4; border-color: #FFAAAA; cursor: default; }
      .table-box.selected { background: #DBEAfe; border-color: #3B82F6; box-shadow: 0 0 0 3px rgba(59,130,246,0.2); }
      .table-num { font-size: 1.3rem; font-weight: 700; }
      .table-seats { font-size: 0.75rem; margin-top: 4px; color: var(--text-muted); }
      .table-box.free .table-seats { color: #2D6A4F; }
      .tooltip {
        position: absolute; bottom: 110%; left: 50%; transform: translateX(-50%);
        background: #1A1A2E; color: #fff;
        padding: 6px 12px; border-radius: 8px; font-size: 0.72rem; white-space: nowrap;
        pointer-events: none; opacity: 0; transition: opacity 0.2s; z-index: 10;
      }
      .table-box.booked:hover .tooltip { opacity: 1; }

      /* FORM */
      .form-group { margin-bottom: 20px; }
      .form-label {
        display: block; font-size: 0.82rem; font-weight: 700;
        color: var(--text-muted); margin-bottom: 6px;
        letter-spacing: 0.06em; text-transform: uppercase;
      }
      .form-control {
        width: 100%; padding: 12px 16px; border-radius: 10px;
        border: 1.5px solid var(--border); background: var(--bg);
        font-family: 'Mulish', sans-serif; font-size: 0.95rem; color: var(--text);
        transition: all 0.2s; outline: none;
      }
      .form-control:focus { border-color: var(--primary); background: #fff; box-shadow: 0 0 0 3px var(--accent-light); }
      .form-control.error { border-color: var(--danger); }
      .error-msg { color: var(--danger); font-size: 0.78rem; margin-top: 4px; }
      .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

      /* MENU SELECTOR (pre-order) */
      .menu-category { margin-bottom: 24px; }
      .menu-cat-title {
        font-size: 0.78rem; font-weight: 800; letter-spacing: 0.1em;
        text-transform: uppercase; color: var(--primary);
        padding: 8px 0; margin-bottom: 12px;
        border-bottom: 2px solid var(--accent-light);
      }
      .menu-item {
        display: flex; align-items: center; justify-content: space-between;
        padding: 12px 16px; border-radius: 10px; background: var(--bg);
        margin-bottom: 8px; gap: 12px;
      }
      .menu-item-thumb {
        width: 48px; height: 48px; border-radius: 10px;
        object-fit: cover; flex-shrink: 0; background: var(--accent-light);
      }
      .menu-item-thumb-placeholder {
        width: 48px; height: 48px; border-radius: 10px;
        background: var(--accent-light); flex-shrink: 0;
        display: flex; align-items: center; justify-content: center;
        font-size: 1.4rem;
      }
      .menu-item-info { flex: 1; min-width: 0; }
      .menu-item-name { font-weight: 600; font-size: 0.92rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .menu-item-desc { font-size: 0.78rem; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .menu-item-price { font-weight: 700; color: var(--primary); white-space: nowrap; }
      .qty-control { display: flex; align-items: center; gap: 8px; }
      .qty-btn {
        width: 28px; height: 28px; border-radius: 50%;
        border: 1.5px solid var(--accent); background: none;
        color: var(--primary); font-size: 1rem; cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        transition: all 0.15s; font-weight: 700;
      }
      .qty-btn:hover { background: var(--accent); color: #fff; }
      .qty-val { font-weight: 700; min-width: 24px; text-align: center; }

      /* ── PUBLIC MENU PAGE ── */
      .menu-hero {
        background: linear-gradient(135deg, #1B4332 0%, #2D6A4F 60%, #40916C 100%);
        padding: 72px 24px 56px;
        text-align: center; position: relative; overflow: hidden;
      }
      .menu-hero::before {
        content: '';
        position: absolute; inset: 0;
        background: url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 L55 20 L55 40 L30 55 L5 40 L5 20 Z' fill='none' stroke='rgba(255,255,255,0.04)' stroke-width='1'/%3E%3C/svg%3E");
        background-size: 60px 60px;
      }
      .menu-hero h1 {
        font-size: clamp(2rem, 5vw, 3.2rem);
        color: #fff; position: relative; z-index: 1; margin-bottom: 10px;
      }
      .menu-hero p {
        color: rgba(255,255,255,0.7); font-size: 1rem;
        position: relative; z-index: 1;
      }

      .menu-page-wrap { max-width: 1100px; margin: 0 auto; padding: 40px 24px 80px; }

      /* Category tabs */
      .cat-tabs {
        display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 32px;
      }
      .cat-tab {
        padding: 9px 20px; border-radius: 50px;
        border: 1.5px solid var(--border); background: var(--card);
        cursor: pointer; font-family: 'Mulish', sans-serif;
        font-weight: 600; font-size: 0.88rem; color: var(--text-muted);
        transition: all 0.2s;
      }
      .cat-tab:hover { border-color: var(--accent); color: var(--primary); background: #f0faf5; }
      .cat-tab.active {
        background: var(--primary); color: #fff;
        border-color: var(--primary);
        box-shadow: 0 4px 14px rgba(45,106,79,0.3);
      }

      /* Dish grid */
      .dish-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 24px;
        transition: opacity 0.25s ease;
      }
      .dish-grid.fading { opacity: 0; }

      /* Dish card */
      .dish-card {
        background: var(--card);
        border-radius: var(--radius);
        box-shadow: var(--shadow);
        overflow: hidden;
        display: flex; flex-direction: column;
        transition: transform 0.22s, box-shadow 0.22s;
        animation: fadeIn 0.35s ease both;
      }
      .dish-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-lg); }

      .dish-photo {
        width: 100%; height: 200px; object-fit: cover;
        display: block; background: var(--accent-light);
      }
      .dish-photo-placeholder {
        width: 100%; height: 200px;
        background: linear-gradient(135deg, var(--accent-light), #d8f3dc);
        display: flex; flex-direction: column;
        align-items: center; justify-content: center; gap: 8px;
      }
      .dish-photo-placeholder span { font-size: 3rem; }
      .dish-photo-placeholder small {
        font-size: 0.72rem; color: var(--primary);
        font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
      }

      .dish-body { padding: 18px 18px 20px; display: flex; flex-direction: column; flex: 1; }
      .dish-name { font-size: 1.15rem; font-weight: 700; margin-bottom: 6px; color: var(--primary-dark); }
      .dish-desc {
        font-size: 0.82rem; color: var(--text-muted);
        display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
        overflow: hidden; margin-bottom: 14px; flex: 1;
      }
      .dish-footer { display: flex; align-items: center; justify-content: space-between; }
      .dish-price {
        font-family: 'Cormorant Garamond', serif;
        font-size: 1.4rem; font-weight: 700; color: var(--success);
      }

      /* Skeleton */
      .skeleton {
        background: linear-gradient(90deg, #e8ede8 25%, #d4ddd4 50%, #e8ede8 75%);
        background-size: 200% 100%;
        animation: shimmer 1.4s infinite;
        border-radius: 8px;
      }
      .dish-card-skeleton {
        background: var(--card); border-radius: var(--radius);
        box-shadow: var(--shadow); overflow: hidden;
      }
      .skeleton-img { height: 200px; width: 100%; }
      .skeleton-body { padding: 18px; display: flex; flex-direction: column; gap: 10px; }
      .skeleton-line { height: 14px; border-radius: 7px; }
      @keyframes shimmer {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }

      /* Empty state */
      .empty-state {
        text-align: center; padding: 60px 24px; color: var(--text-muted);
        grid-column: 1 / -1;
      }
      .empty-state .empty-icon { font-size: 3rem; margin-bottom: 12px; }
      .empty-state p { font-size: 1rem; }

      /* SUMMARY */
      .summary-card {
        background: linear-gradient(135deg, #1B4332, #2D6A4F);
        border-radius: var(--radius); padding: 32px; color: #fff;
      }
      .summary-row {
        display: flex; justify-content: space-between; align-items: center;
        padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1);
      }
      .summary-row:last-child { border-bottom: none; }
      .summary-label { font-size: 0.82rem; opacity: 0.7; }
      .summary-val { font-weight: 700; }
      .booking-ref-box {
        text-align: center; padding: 32px;
        background: linear-gradient(135deg, #f0faf5, #e6f7ee);
        border-radius: var(--radius); border: 2px dashed var(--accent);
      }
      .booking-ref-box .ref-code {
        font-family: 'Cormorant Garamond', serif;
        font-size: 3rem; font-weight: 700; color: var(--primary);
        letter-spacing: 0.15em;
      }

      /* ADMIN */
      .admin-layout { display: flex; min-height: 100vh; }
      .admin-sidebar {
        width: 240px; background: var(--primary-dark);
        padding: 24px 16px; display: flex; flex-direction: column; gap: 8px;
        flex-shrink: 0;
      }
      .admin-sidebar-title {
        color: var(--accent-light); font-family: 'Cormorant Garamond', serif;
        font-size: 1.3rem; padding: 8px 12px; margin-bottom: 16px; font-weight: 700;
      }
      .sidebar-btn {
        padding: 12px 16px; border-radius: 10px; border: none;
        background: transparent; color: rgba(255,255,255,0.65);
        cursor: pointer; text-align: left; font-family: 'Mulish', sans-serif;
        font-size: 0.9rem; font-weight: 500; transition: all 0.2s;
      }
      .sidebar-btn:hover, .sidebar-btn.active {
        background: rgba(255,255,255,0.1); color: #fff;
      }
      .admin-content { flex: 1; padding: 32px; overflow-y: auto; background: var(--bg); }

      /* TABLE */
      .data-table { width: 100%; border-collapse: collapse; }
      .data-table th {
        padding: 12px 16px; text-align: left;
        font-size: 0.75rem; font-weight: 800; letter-spacing: 0.08em;
        text-transform: uppercase; color: var(--text-muted);
        border-bottom: 2px solid var(--border); background: var(--bg);
      }
      .data-table td {
        padding: 14px 16px; border-bottom: 1px solid var(--border);
        font-size: 0.88rem; vertical-align: middle;
      }
      .data-table tr:last-child td { border-bottom: none; }
      .data-table tr:hover td { background: #f9fafb; }

      /* STATUS BADGE */
      .status-badge {
        padding: 3px 10px; border-radius: 20px;
        font-size: 0.72rem; font-weight: 700; letter-spacing: 0.05em;
      }
      .status-upcoming { background: #D1FAE5; color: #065F46; }
      .status-past { background: #F3F4F6; color: #6B7280; }

      /* TOAST */
      .toast {
        position: fixed; top: 88px; right: 24px; z-index: 9999;
        padding: 16px 24px; border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.15);
        font-weight: 600; font-size: 0.92rem;
        animation: slideIn 0.3s ease; max-width: 340px;
      }
      .toast-success { background: var(--success); color: #fff; }
      .toast-error { background: var(--danger); color: #fff; }
      @keyframes slideIn { from { transform: translateX(120%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

      /* SPINNER */
      .spinner {
        display: inline-block; width: 20px; height: 20px;
        border: 2.5px solid rgba(255,255,255,0.3);
        border-top-color: #fff; border-radius: 50%;
        animation: spin 0.7s linear infinite;
      }
      .spinner-dark {
        border-color: rgba(45,106,79,0.2); border-top-color: var(--primary);
      }
      @keyframes spin { to { transform: rotate(360deg); } }
      .loading-overlay {
        display: flex; align-items: center; justify-content: center;
        padding: 40px; flex-direction: column; gap: 12px; color: var(--text-muted);
        font-size: 0.88rem;
      }

      /* MISC */
      .page-title { font-size: 2rem; color: var(--primary-dark); margin-bottom: 8px; }
      .page-subtitle { color: var(--text-muted); margin-bottom: 32px; }
      .divider { height: 1px; background: var(--border); margin: 24px 0; }
      .text-center { text-align: center; }
      .mt-4 { margin-top: 16px; }
      .mt-6 { margin-top: 24px; }
      .mt-8 { margin-top: 32px; }
      .mb-4 { margin-bottom: 16px; }
      .flex { display: flex; }
      .items-center { align-items: center; }
      .gap-2 { gap: 8px; }
      .gap-3 { gap: 12px; }
      .flex-1 { flex: 1; }
      .justify-between { justify-content: space-between; }
      .price-display {
        font-family: 'Cormorant Garamond', serif;
        font-size: 2.4rem; font-weight: 700; color: var(--primary);
      }

      /* Radio group */
      .radio-group { display: flex; flex-direction: column; gap: 10px; }
      .radio-option {
        display: flex; align-items: center; gap: 12px;
        padding: 14px 18px; border-radius: 12px;
        border: 1.5px solid var(--border); cursor: pointer;
        transition: all 0.2s; background: var(--card);
      }
      .radio-option:hover { border-color: var(--accent); background: #f0faf5; }
      .radio-option.selected { border-color: var(--primary); background: #f0faf5; }
      .radio-option input { accent-color: var(--primary); }
      .radio-label { flex: 1; }
      .radio-label strong { display: block; font-size: 0.92rem; }
      .radio-label span { font-size: 0.8rem; color: var(--text-muted); }

      .inline-edit { background: #f8fff9; border: 1.5px solid var(--accent); border-radius: 12px; padding: 16px; margin-bottom: 8px; }

      /* admin dish preview */
      .admin-dish-thumb {
        width: 52px; height: 40px; border-radius: 8px; object-fit: cover;
        background: var(--accent-light); flex-shrink: 0;
      }
      .admin-dish-thumb-placeholder {
        width: 52px; height: 40px; border-radius: 8px;
        background: var(--accent-light); display: flex; align-items: center;
        justify-content: center; font-size: 1.2rem; flex-shrink: 0;
      }

      @media (max-width: 900px) {
        .dish-grid { grid-template-columns: repeat(2, 1fr); }
      }
      @media (max-width: 768px) {
        .navbar-links { display: none; }
        .hamburger { display: flex; }
        .form-row { grid-template-columns: 1fr; }
        .hall-grid { grid-template-columns: 1fr; }
        .timeslots { grid-template-columns: repeat(3, 1fr); }
        .table-map { grid-template-columns: repeat(3, 1fr); }
        .admin-layout { flex-direction: column; }
        .admin-sidebar { width: 100%; flex-direction: row; overflow-x: auto; padding: 12px; gap: 4px; }
        .admin-content { padding: 16px; }
        .data-table { font-size: 0.78rem; }
        .data-table th, .data-table td { padding: 10px 8px; }
        .dish-grid { grid-template-columns: 1fr; }
      }

      .fade-in { animation: fadeIn 0.3s ease; }
      @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);
  return null;
}

// ─── TOAST ────────────────────────────────────────────────────────────────────
function Toast({ msg, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);
  return <div className={`toast toast-${type}`}>{msg}</div>;
}

// ─── IMAGE WITH FALLBACK ──────────────────────────────────────────────────────
function ImageWithFallback({ src, alt, className, placeholderClass, category }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className={placeholderClass || "dish-photo-placeholder"}>
        <span>🍽️</span>
        {category && <small>{category}</small>}
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}

// ─── DISH CARD (public menu) ──────────────────────────────────────────────────
function DishCard({ dish }) {
  const f = dish.fields;
  return (
    <div className="dish-card">
      <ImageWithFallback
        src={f.ImageUrl}
        alt={f.Name}
        className="dish-photo"
        placeholderClass="dish-photo-placeholder"
        category={f.Category}
      />
      <div className="dish-body">
        <div className="dish-name">{f.Name}</div>
        {f.Description && <div className="dish-desc">{f.Description}</div>}
        <div className="dish-footer">
          <div className="dish-price">{(f.Price || 0).toLocaleString()} ₸</div>
          {f.Category && <span className="badge-cat">{f.Category}</span>}
        </div>
      </div>
    </div>
  );
}

// ─── SKELETON CARD ────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="dish-card-skeleton">
      <div className="skeleton skeleton-img" />
      <div className="skeleton-body">
        <div className="skeleton skeleton-line" style={{ width: "70%" }} />
        <div className="skeleton skeleton-line" style={{ width: "100%" }} />
        <div className="skeleton skeleton-line" style={{ width: "55%" }} />
      </div>
    </div>
  );
}

// ─── PUBLIC MENU PAGE ─────────────────────────────────────────────────────────
function MenuPage({ lang }) {
  const t = (k) => translations[lang][k];
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("__all__");
  const [fading, setFading] = useState(false);

  useEffect(() => {
    setLoading(true);
    airtableFetch("Menu", { filterByFormula: "{Available}=1" })
      .then(records => setDishes(records))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const categories = ["__all__", ...Array.from(new Set(dishes.map(d => d.fields.Category).filter(Boolean)))];

  const filtered = activeCategory === "__all__"
    ? dishes
    : dishes.filter(d => d.fields.Category === activeCategory);

  const changeCategory = (cat) => {
    if (cat === activeCategory) return;
    setFading(true);
    setTimeout(() => {
      setActiveCategory(cat);
      setFading(false);
    }, 220);
  };

  return (
    <div>
      {/* Hero */}
      <div className="menu-hero">
        <h1>{t("menuHeroTitle")} / Наше меню</h1>
        <p>{t("menuHeroSub")}</p>
      </div>

      <div className="menu-page-wrap">
        {/* Category tabs */}
        <div className="cat-tabs">
          {loading
            ? [1, 2, 3, 4].map(i => (
                <div key={i} className="skeleton" style={{ width: 90, height: 38, borderRadius: 50 }} />
              ))
            : categories.map(cat => (
                <button
                  key={cat}
                  className={`cat-tab${activeCategory === cat ? " active" : ""}`}
                  onClick={() => changeCategory(cat)}
                >
                  {cat === "__all__" ? `${t("all")} / Все` : cat}
                </button>
              ))
          }
        </div>

        {/* Dish grid */}
        <div className={`dish-grid${fading ? " fading" : ""}`}>
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : filtered.length === 0
              ? (
                <div className="empty-state">
                  <div className="empty-icon">🍽️</div>
                  <p>{t("noDishesInCategory")}</p>
                </div>
              )
              : filtered.map(dish => <DishCard key={dish.id} dish={dish} />)
          }
        </div>
      </div>
    </div>
  );
}

// ─── CALENDAR ────────────────────────────────────────────────────────────────
function Calendar({ selectedDate, onSelect, bookedDates = [], lang }) {
  const tr = translations[lang];
  const MONTH_NAMES = [
    tr.january, tr.february, tr.march, tr.april, tr.may, tr.june,
    tr.july, tr.august, tr.september, tr.october, tr.november, tr.december,
  ];
  const DAY_NAMES = [tr.mon, tr.tue, tr.wed, tr.thu, tr.fri, tr.sat, tr.sun];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [view, setView] = useState(() => {
    const d = selectedDate ? new Date(selectedDate) : new Date();
    return { y: d.getFullYear(), m: d.getMonth() };
  });

  const firstDay = new Date(view.y, view.m, 1);
  const lastDay = new Date(view.y, view.m + 1, 0);
  let startDow = firstDay.getDay();
  startDow = startDow === 0 ? 6 : startDow - 1;

  const cells = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= lastDay.getDate(); d++) cells.push(d);

  const prevMonth = () => {
    if (view.m === 0) setView({ y: view.y - 1, m: 11 });
    else setView({ y: view.y, m: view.m - 1 });
  };
  const nextMonth = () => {
    if (view.m === 11) setView({ y: view.y + 1, m: 0 });
    else setView({ y: view.y, m: view.m + 1 });
  };

  return (
    <div className="calendar-wrap">
      <div className="cal-header">
        <button className="cal-nav" onClick={prevMonth}>‹</button>
        <h3>{MONTH_NAMES[view.m]} {view.y}</h3>
        <button className="cal-nav" onClick={nextMonth}>›</button>
      </div>
      <div className="cal-grid">
        {DAY_NAMES.map(d => <div key={d} className="cal-day-label">{d}</div>)}
        {cells.map((day, i) => {
          if (!day) return <div key={`e-${i}`} />;
          const dateStr = `${view.y}-${String(view.m + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const dateObj = new Date(view.y, view.m, day);
          const isPast = dateObj < today;
          const isToday = dateObj.getTime() === today.getTime();
          const isSelected = selectedDate === dateStr;
          const isBooked = bookedDates.includes(dateStr);
          return (
            <button
              key={day}
              className={`cal-day${isToday ? " today" : ""}${isSelected ? " selected" : ""}${isBooked ? " booked-banquet" : ""}`}
              disabled={isPast}
              onClick={() => !isPast && onSelect(dateStr)}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar({ page, setPage, lang, setLang }) {
  const t = (k) => translations[lang][k];
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { key: "home", label: t("home") },
    { key: "menu", label: t("menu") },
    { key: "reservation", label: t("reservation") },
    { key: "banquet", label: t("banquet") },
    { key: "admin", label: t("admin") },
  ];

  const go = (p) => { setPage(p); setMenuOpen(false); };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand" onClick={() => go("home")}>
          <span className="brand-name">🌿 {t("appName")}</span>
          <span className="brand-tagline">{t("appTagline")}</span>
        </div>
        <ul className="navbar-links">
          {navItems.map(i => (
            <li key={i.key}>
              <button className={`nav-link${page === i.key ? " active" : ""}`} onClick={() => go(i.key)}>
                {i.label}
              </button>
            </li>
          ))}
          <li style={{ display: "flex", gap: 4, marginLeft: 8 }}>
            <button className={`lang-btn${lang === "kz" ? " active" : ""}`} onClick={() => setLang("kz")}>ҚАЗ</button>
            <button className={`lang-btn${lang === "ru" ? " active" : ""}`} onClick={() => setLang("ru")}>РУС</button>
          </li>
        </ul>
        <button className="hamburger" onClick={() => setMenuOpen(o => !o)}>
          <span /><span /><span />
        </button>
      </nav>
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {navItems.map(i => (
          <button key={i.key} className={`nav-link${page === i.key ? " active" : ""}`} onClick={() => go(i.key)}>
            {i.label}
          </button>
        ))}
        <div style={{ display: "flex", gap: 4, padding: "8px 0" }}>
          <button className={`lang-btn${lang === "kz" ? " active" : ""}`} onClick={() => setLang("kz")}>ҚАЗ</button>
          <button className={`lang-btn${lang === "ru" ? " active" : ""}`} onClick={() => setLang("ru")}>РУС</button>
        </div>
      </div>
    </>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({ setPage, lang }) {
  const t = (k) => translations[lang][k];
  return (
    <div>
      <div className="hero">
        <div className="hero-content fade-in">
          <div className="hero-badge">✦ {t("appName")} Restaurant</div>
          <h1>{t("heroTitle")}</h1>
          <p>{t("heroSubtitle")}</p>
          <div className="hero-btns">
            <button className="btn btn-primary" onClick={() => setPage("reservation")}>
              🍽️ {t("bookTable")}
            </button>
            <button className="btn btn-outline" onClick={() => setPage("menu")}>
              📖 {t("menu")}
            </button>
            <button className="btn btn-outline" onClick={() => setPage("banquet")}>
              🎊 {t("bookBanquet")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── STEP WIZARD ──────────────────────────────────────────────────────────────
function StepBar({ step, lang }) {
  const t = (k) => translations[lang][k];
  const steps = [t("step1"), t("step2"), t("step3"), t("step4"), t("step5")];
  return (
    <div className="step-bar">
      {steps.map((s, i) => {
        const n = i + 1;
        const cls = n < step ? "done" : n === step ? "active" : "";
        return (
          <div key={i} className={`step-item ${cls}`}>
            <div className="step-circle">{n < step ? "✓" : n}</div>
            <div className="step-label">{s}</div>
          </div>
        );
      })}
    </div>
  );
}

// ─── TIME SLOT PICKER ─────────────────────────────────────────────────────────
function TimeSlotPicker({ selectedDate, selectedHall, selectedSlot, onSelect, lang }) {
  const t = (k) => translations[lang][k];
  const [availability, setAvailability] = useState({});
  const [loading, setLoading] = useState(false);

  const hallData = HALLS.find(h => h.id === selectedHall);
  const totalTables = hallData ? hallData.tables.length : 0;

  useEffect(() => {
    if (!selectedDate || !selectedHall) return;
    setLoading(true);
    airtableFetch("Reservations", {
      filterByFormula: `AND({Date}='${selectedDate}',{Hall}='${selectedHall}',{Status}='confirmed')`,
    }).then(records => {
      const counts = {};
      records.forEach(r => {
        const slot = r.fields.TimeSlot;
        if (slot) counts[slot] = (counts[slot] || 0) + 1;
      });
      setAvailability(counts);
    }).catch(() => {}).finally(() => setLoading(false));
  }, [selectedDate, selectedHall]);

  if (loading) return <div className="loading-overlay"><div className="spinner spinner-dark" /></div>;

  return (
    <div className="timeslots">
      {TIME_SLOTS.map(slot => {
        const booked = availability[slot] || 0;
        const free = totalTables - booked;
        const full = free <= 0;
        return (
          <button
            key={slot}
            className={`timeslot-btn${selectedSlot === slot ? " selected" : ""}`}
            disabled={full}
            onClick={() => onSelect(slot)}
          >
            <div className="slot-time">{slot}</div>
            <div className="slot-avail">
              {full ? t("fullyBooked") : `${free} ${t("tablesAvailable")}`}
            </div>
          </button>
        );
      })}
    </div>
  );
}

// ─── TABLE MAP ────────────────────────────────────────────────────────────────
function TableMap({ selectedHall, selectedDate, selectedSlot, selectedTable, onSelect, lang }) {
  const t = (k) => translations[lang][k];
  const [bookedTables, setBookedTables] = useState([]);
  const [loading, setLoading] = useState(false);

  const hallData = HALLS.find(h => h.id === selectedHall);

  useEffect(() => {
    if (!selectedDate || !selectedHall || !selectedSlot) return;
    setLoading(true);
    const slotHour = parseInt(selectedSlot.split(":")[0]);
    airtableFetch("Reservations", {
      filterByFormula: `AND({Date}='${selectedDate}',{Hall}='${selectedHall}',{Status}='confirmed')`,
    }).then(records => {
      const booked = [];
      records.forEach(r => {
        const rSlotHour = parseInt((r.fields.TimeSlot || "0").split(":")[0]);
        const overlap = Math.abs(rSlotHour - slotHour) < 2;
        if (overlap) booked.push({ num: r.fields.TableNumber, end: r.fields.EndTime });
      });
      setBookedTables(booked);
    }).catch(() => {}).finally(() => setLoading(false));
  }, [selectedDate, selectedHall, selectedSlot]);

  if (!hallData) return null;
  if (loading) return <div className="loading-overlay"><div className="spinner spinner-dark" /></div>;

  return (
    <div className="table-map">
      {hallData.tables.map(tbl => {
        const bookedInfo = bookedTables.find(b => b.num === tbl.num);
        const isBooked = !!bookedInfo;
        const isSelected = selectedTable === tbl.num;
        return (
          <div
            key={tbl.num}
            className={`table-box${isBooked ? " booked" : isSelected ? " selected" : " free"}`}
            onClick={() => !isBooked && onSelect(tbl.num)}
          >
            <div className="table-num">#{tbl.num}</div>
            <div className="table-seats">{tbl.seats} {t("seats")}</div>
            {isBooked && (
              <div className="tooltip">{t("bookedUntil")}: {bookedInfo.end}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── MENU SELECTOR (pre-order in reservation) ────────────────────────────────
function MenuSelector({ items, order, onChange, lang }) {
  const t = (k) => translations[lang][k];
  const categories = [...new Set(items.map(i => i.fields.Category || "Other"))];

  const getQty = (id) => (order[id] || 0);
  const setQty = (id, qty) => {
    const updated = { ...order };
    if (qty <= 0) delete updated[id];
    else updated[id] = qty;
    onChange(updated);
  };

  const subtotal = items.reduce((acc, item) => {
    const qty = getQty(item.id);
    return acc + qty * (item.fields.Price || 0);
  }, 0);

  return (
    <div>
      {categories.map(cat => (
        <div key={cat} className="menu-category">
          <div className="menu-cat-title">{cat}</div>
          {items
            .filter(i => (i.fields.Category || "Other") === cat && i.fields.Available !== false)
            .map(item => (
              <div key={item.id} className="menu-item">
                {/* Photo thumbnail */}
                {item.fields.ImageUrl ? (
                  <img
                    src={item.fields.ImageUrl}
                    alt={item.fields.Name}
                    className="menu-item-thumb"
                    onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
                  />
                ) : null}
                <div
                  className="menu-item-thumb-placeholder"
                  style={{ display: item.fields.ImageUrl ? "none" : "flex" }}
                >
                  🍽️
                </div>
                <div className="menu-item-info">
                  <div className="menu-item-name">{item.fields.Name}</div>
                  {item.fields.Description && (
                    <div className="menu-item-desc">{item.fields.Description}</div>
                  )}
                </div>
                <div className="menu-item-price">{(item.fields.Price || 0).toLocaleString()} ₸</div>
                <div className="qty-control">
                  <button className="qty-btn" onClick={() => setQty(item.id, getQty(item.id) - 1)}>−</button>
                  <span className="qty-val">{getQty(item.id)}</span>
                  <button className="qty-btn" onClick={() => setQty(item.id, getQty(item.id) + 1)}>+</button>
                </div>
              </div>
            ))}
        </div>
      ))}
      {subtotal > 0 && (
        <div className="flex justify-between items-center mt-4" style={{ padding: "12px 0", borderTop: "2px solid var(--accent-light)" }}>
          <span style={{ fontWeight: 700 }}>{t("subtotal")}</span>
          <span className="price-display" style={{ fontSize: "1.5rem" }}>{subtotal.toLocaleString()} ₸</span>
        </div>
      )}
    </div>
  );
}

// ─── RESERVATION PAGE ─────────────────────────────────────────────────────────
function ReservationPage({ lang, showToast }) {
  const t = (k) => translations[lang][k];
  const [step, setStep] = useState(1);
  const [selectedHall, setSelectedHall] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [order, setOrder] = useState({});
  const [form, setForm] = useState({ name: "", phone: "", email: "", guests: "", comments: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [bookingRef, setBookingRef] = useState(null);

  useEffect(() => {
    airtableFetch("Menu").then(setMenuItems).catch(() => {});
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const goStep = (n) => { setStep(n); scrollTop(); };

  const hallData = HALLS.find(h => h.id === selectedHall);
  const tableData = hallData?.tables.find(tb => tb.num === selectedTable);

  const validateForm = () => {
    const e = {};
    if (!form.name.trim()) e.name = t("required");
    if (!form.phone.trim()) e.phone = t("required");
    else if (!/^\+7\d{10}$/.test(form.phone)) e.phone = t("phoneTooShort");
    if (!form.guests) e.guests = t("required");
    else if (tableData && parseInt(form.guests) > tableData.seats) e.guests = t("guestsTooMany");
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setLoading(true);
    const ref = genRef();
    const endTime = addHours(selectedSlot, 2);
    try {
      await airtableCreate("Reservations", {
        GuestName: form.name,
        Phone: form.phone,
        Email: form.email,
        Hall: selectedHall,
        TableNumber: selectedTable,
        Date: selectedDate,
        TimeSlot: selectedSlot,
        EndTime: endTime,
        Guests: parseInt(form.guests),
        Comments: form.comments,
        BookingRef: ref,
        Status: "confirmed",
      });
      for (const [itemId, qty] of Object.entries(order)) {
        const item = menuItems.find(m => m.id === itemId);
        if (item) {
          await airtableCreate("PreOrders", {
            BookingRef: ref,
            ItemName: item.fields.Name,
            Quantity: qty,
            UnitPrice: item.fields.Price || 0,
            Subtotal: qty * (item.fields.Price || 0),
          });
        }
      }
      setBookingRef(ref);
      goStep(6);
    } catch {
      showToast(t("errorSaving"), "error");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setStep(1); setSelectedHall(null); setSelectedDate(null);
    setSelectedSlot(null); setSelectedTable(null);
    setOrder({}); setForm({ name: "", phone: "", email: "", guests: "", comments: "" });
    setBookingRef(null); scrollTop();
  };

  if (bookingRef) {
    return (
      <div className="wizard-container fade-in">
        <div className="text-center mb-4">
          <div style={{ fontSize: "4rem", marginBottom: 16 }}>🎉</div>
          <h2 style={{ fontSize: "1.8rem", color: "var(--success)", marginBottom: 8 }}>{t("bookingSuccess")}</h2>
        </div>
        <div className="booking-ref-box">
          <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: 8, letterSpacing: "0.1em", textTransform: "uppercase" }}>{t("bookingRef")}</div>
          <div className="ref-code">{bookingRef}</div>
        </div>
        <div className="mt-8 text-center">
          <button className="btn btn-green" onClick={reset}>{t("newBooking")}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="wizard-container">
      <h1 className="page-title">{t("reservation")}</h1>
      <StepBar step={step} lang={lang} />

      {step === 1 && (
        <div className="fade-in">
          <div className="hall-grid">
            {HALLS.map(hall => (
              <div
                key={hall.id}
                className={`hall-card${selectedHall === hall.id ? " selected" : ""}`}
                onClick={() => setSelectedHall(hall.id)}
              >
                <div className="hall-icon">{hall.id === "vip" ? "💎" : hall.id === "main" ? "🏛️" : "🌿"}</div>
                <h3>{t(hall.nameKey)}</h3>
                <p>{t(hall.descKey)}</p>
                <span className={`badge ${hall.paid ? "badge-paid" : "badge-free"}`}>
                  {hall.paid ? t("paid") : t("free")}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-8">
            <div />
            <button className="btn btn-green" disabled={!selectedHall} onClick={() => goStep(2)}>
              {t("next")} →
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="fade-in">
          <div className="card mb-4" style={{ marginBottom: 24 }}>
            <div className="card-header"><h3 style={{ fontSize: "1rem", fontFamily: "Mulish, sans-serif", fontWeight: 700 }}>{t("selectDate")}</h3></div>
            <div className="card-body">
              <Calendar selectedDate={selectedDate} onSelect={d => { setSelectedDate(d); setSelectedSlot(null); }} lang={lang} />
            </div>
          </div>
          {selectedDate && (
            <div className="card">
              <div className="card-header"><h3 style={{ fontSize: "1rem", fontFamily: "Mulish, sans-serif", fontWeight: 700 }}>{t("selectTime")}</h3></div>
              <div className="card-body">
                <TimeSlotPicker
                  selectedDate={selectedDate}
                  selectedHall={selectedHall}
                  selectedSlot={selectedSlot}
                  onSelect={setSelectedSlot}
                  lang={lang}
                />
              </div>
            </div>
          )}
          <div className="flex justify-between mt-8">
            <button className="btn btn-ghost" onClick={() => goStep(1)}>← {t("back")}</button>
            <button className="btn btn-green" disabled={!selectedDate || !selectedSlot} onClick={() => goStep(3)}>
              {t("next")} →
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="fade-in">
          <div className="card">
            <div className="card-header"><h3 style={{ fontSize: "1rem", fontFamily: "Mulish, sans-serif", fontWeight: 700 }}>{t("selectTable")}</h3></div>
            <div className="card-body">
              <TableMap
                selectedHall={selectedHall}
                selectedDate={selectedDate}
                selectedSlot={selectedSlot}
                selectedTable={selectedTable}
                onSelect={setSelectedTable}
                lang={lang}
              />
            </div>
          </div>
          <div className="flex justify-between mt-8">
            <button className="btn btn-ghost" onClick={() => goStep(2)}>← {t("back")}</button>
            <button className="btn btn-green" disabled={!selectedTable} onClick={() => goStep(4)}>
              {t("next")} →
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="fade-in">
          <div className="card mb-4" style={{ marginBottom: 24 }}>
            <div className="card-header"><h3 style={{ fontSize: "1rem", fontFamily: "Mulish, sans-serif", fontWeight: 700 }}>{t("guestInfo")}</h3></div>
            <div className="card-body">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">{t("fullName")} *</label>
                  <input className={`form-control${errors.name ? " error" : ""}`} value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                  {errors.name && <div className="error-msg">{errors.name}</div>}
                </div>
                <div className="form-group">
                  <label className="form-label">{t("phone")} *</label>
                  <input className={`form-control${errors.phone ? " error" : ""}`} value={form.phone}
                    placeholder="+7XXXXXXXXXX"
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                  {errors.phone && <div className="error-msg">{errors.phone}</div>}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">{t("email")}</label>
                  <input className="form-control" type="email" value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">{t("numGuests")} * {tableData && `(max ${tableData.seats})`}</label>
                  <input className={`form-control${errors.guests ? " error" : ""}`} type="number" min="1"
                    max={tableData?.seats} value={form.guests}
                    onChange={e => setForm(f => ({ ...f, guests: e.target.value }))} />
                  {errors.guests && <div className="error-msg">{errors.guests}</div>}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">{t("comments")}</label>
                <textarea className="form-control" rows={3} value={form.comments}
                  onChange={e => setForm(f => ({ ...f, comments: e.target.value }))} />
              </div>
            </div>
          </div>
          {menuItems.length > 0 && (
            <div className="card">
              <div className="card-header"><h3 style={{ fontSize: "1rem", fontFamily: "Mulish, sans-serif", fontWeight: 700 }}>{t("preOrderOptional")}</h3></div>
              <div className="card-body">
                <MenuSelector items={menuItems} order={order} onChange={setOrder} lang={lang} />
              </div>
            </div>
          )}
          <div className="flex justify-between mt-8">
            <button className="btn btn-ghost" onClick={() => goStep(3)}>← {t("back")}</button>
            <button className="btn btn-green" onClick={() => { if (validateForm()) goStep(5); }}>
              {t("next")} →
            </button>
          </div>
        </div>
      )}

      {step === 5 && (
        <div className="fade-in">
          <div className="summary-card mb-4" style={{ marginBottom: 24 }}>
            <h2 style={{ color: "#fff", marginBottom: 20, fontSize: "1.4rem" }}>📋 {t("step5")}</h2>
            <div className="summary-row">
              <span className="summary-label">{t("hallLabel")}</span>
              <span className="summary-val">{t(hallData?.nameKey)}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">{t("dateLabel")}</span>
              <span className="summary-val">{selectedDate}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">{t("timeLabel")}</span>
              <span className="summary-val">{selectedSlot} – {addHours(selectedSlot, 2)}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">{t("tableLabel")}</span>
              <span className="summary-val">#{selectedTable} ({tableData?.seats} {t("seats")})</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">{t("fullName")}</span>
              <span className="summary-val">{form.name}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">{t("phone")}</span>
              <span className="summary-val">{form.phone}</span>
            </div>
            {Object.keys(order).length > 0 && (
              <div className="summary-row">
                <span className="summary-label">{t("preOrder")}</span>
                <span className="summary-val">
                  {Object.entries(order).map(([id, qty]) => {
                    const item = menuItems.find(m => m.id === id);
                    return item ? `${item.fields.Name} x${qty}` : "";
                  }).filter(Boolean).join(", ")}
                </span>
              </div>
            )}
          </div>
          <div className="flex justify-between mt-8">
            <button className="btn btn-ghost" onClick={() => goStep(4)}>← {t("back")}</button>
            <button className="btn btn-green" onClick={handleSubmit} disabled={loading}>
              {loading ? <span className="spinner" /> : null}
              {t("confirmBooking")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── BANQUET PAGE ─────────────────────────────────────────────────────────────
function BanquetPage({ lang, showToast }) {
  const t = (k) => translations[lang][k];
  const [form, setForm] = useState({
    eventName: "", contactName: "", phone: "", guests: "",
    menuType: "standard", startTime: "10:00", duration: "2",
    comments: "", date: null,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [bookedDates, setBookedDates] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    airtableFetch("Banquets").then(records => {
      setBookedDates(records.map(r => r.fields.Date).filter(Boolean));
    }).catch(() => {});
  }, []);

  const startTimes = ["10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00"];
  const guests = parseInt(form.guests) || 0;
  const pricePerPerson = BANQUET_MENU_PRICES[form.menuType] || 0;
  const totalPrice = guests * pricePerPerson;

  const validate = () => {
    const e = {};
    if (!form.eventName.trim()) e.eventName = t("required");
    if (!form.contactName.trim()) e.contactName = t("required");
    if (!form.phone.trim()) e.phone = t("required");
    else if (!/^\+7\d{10}$/.test(form.phone)) e.phone = t("phoneTooShort");
    if (!form.guests) e.guests = t("required");
    else if (guests < 20) e.guests = t("minGuests");
    else if (guests > 200) e.guests = t("maxGuests");
    if (!form.date) e.date = t("required");
    else if (bookedDates.includes(form.date)) e.date = t("fullyBooked");
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await airtableCreate("Banquets", {
        EventName: form.eventName,
        ContactName: form.contactName,
        Phone: form.phone,
        Guests: guests,
        MenuType: form.menuType,
        PricePerPerson: pricePerPerson,
        TotalPrice: totalPrice,
        Date: form.date,
        StartTime: form.startTime,
        Duration: `${form.duration}h`,
        Comments: form.comments,
        Status: "confirmed",
      });
      setSuccess(true);
      setBookedDates(d => [...d, form.date]);
    } catch {
      showToast(t("errorSaving"), "error");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="wizard-container fade-in text-center">
        <div style={{ fontSize: "4rem", marginBottom: 16 }}>🎊</div>
        <h2 style={{ fontSize: "1.8rem", color: "var(--success)", marginBottom: 16 }}>{t("banquetSuccess")}</h2>
        <div className="summary-card" style={{ maxWidth: 400, margin: "0 auto 24px" }}>
          <div className="summary-row"><span className="summary-label">{t("eventName")}</span><span className="summary-val">{form.eventName}</span></div>
          <div className="summary-row"><span className="summary-label">{t("dateLabel")}</span><span className="summary-val">{form.date}</span></div>
          <div className="summary-row"><span className="summary-label">{t("guestsCount")}</span><span className="summary-val">{form.guests}</span></div>
          <div className="summary-row"><span className="summary-label">{t("totalPrice")}</span><span className="summary-val">{totalPrice.toLocaleString()} ₸</span></div>
        </div>
        <button className="btn btn-green" onClick={() => { setSuccess(false); setForm({ eventName: "", contactName: "", phone: "", guests: "", menuType: "standard", startTime: "10:00", duration: "2", comments: "", date: null }); }}>
          {t("newBooking")}
        </button>
      </div>
    );
  }

  return (
    <div className="wizard-container">
      <h1 className="page-title">{t("banquetTitle")}</h1>
      <p className="page-subtitle">{t("banquetDesc")}</p>
      <div className="card mb-4" style={{ marginBottom: 24 }}>
        <div className="card-header"><h3 style={{ fontSize: "1rem", fontFamily: "Mulish, sans-serif", fontWeight: 700 }}>{t("selectDate")}</h3></div>
        <div className="card-body">
          <Calendar selectedDate={form.date} onSelect={d => setForm(f => ({ ...f, date: d }))} bookedDates={bookedDates} lang={lang} />
          {errors.date && <div className="error-msg mt-4">{errors.date}</div>}
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">{t("eventName")} *</label>
              <input className={`form-control${errors.eventName ? " error" : ""}`} value={form.eventName}
                onChange={e => setForm(f => ({ ...f, eventName: e.target.value }))} />
              {errors.eventName && <div className="error-msg">{errors.eventName}</div>}
            </div>
            <div className="form-group">
              <label className="form-label">{t("contactName")} *</label>
              <input className={`form-control${errors.contactName ? " error" : ""}`} value={form.contactName}
                onChange={e => setForm(f => ({ ...f, contactName: e.target.value }))} />
              {errors.contactName && <div className="error-msg">{errors.contactName}</div>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">{t("phone")} *</label>
              <input className={`form-control${errors.phone ? " error" : ""}`} value={form.phone}
                placeholder="+7XXXXXXXXXX"
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
              {errors.phone && <div className="error-msg">{errors.phone}</div>}
            </div>
            <div className="form-group">
              <label className="form-label">{t("guestsCount")} * (20–200)</label>
              <input className={`form-control${errors.guests ? " error" : ""}`} type="number" value={form.guests}
                min={20} max={200}
                onChange={e => setForm(f => ({ ...f, guests: e.target.value }))} />
              {errors.guests && <div className="error-msg">{errors.guests}</div>}
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">{t("menuType")}</label>
            <div className="radio-group">
              {["standard", "premium", "vip"].map(type => (
                <label key={type} className={`radio-option${form.menuType === type ? " selected" : ""}`}>
                  <input type="radio" name="menuType" value={type} checked={form.menuType === type}
                    onChange={() => setForm(f => ({ ...f, menuType: type }))} />
                  <div className="radio-label">
                    <strong>{t(type)}</strong>
                    <span>{BANQUET_MENU_PRICES[type].toLocaleString()} ₸ / {t("perPerson")}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">{t("startTime")}</label>
              <select className="form-control" value={form.startTime}
                onChange={e => setForm(f => ({ ...f, startTime: e.target.value }))}>
                {startTimes.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">{t("duration")}</label>
              <select className="form-control" value={form.duration}
                onChange={e => setForm(f => ({ ...f, duration: e.target.value }))}>
                {["2", "4", "6", "8"].map(d => (
                  <option key={d} value={d}>{d} {t("hours")}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">{t("specialRequests")}</label>
            <textarea className="form-control" rows={3} value={form.comments}
              onChange={e => setForm(f => ({ ...f, comments: e.target.value }))} />
          </div>
          {guests >= 20 && (
            <div style={{ textAlign: "center", padding: "20px", background: "var(--accent-light)", borderRadius: "var(--radius)", marginBottom: 16 }}>
              <div style={{ fontSize: "0.82rem", color: "var(--primary)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
                {t("totalPrice")}
              </div>
              <div className="price-display">{totalPrice.toLocaleString()} ₸</div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: 4 }}>
                {pricePerPerson.toLocaleString()} ₸ × {guests} = {totalPrice.toLocaleString()} ₸
              </div>
            </div>
          )}
          <button className="btn btn-green" style={{ width: "100%" }} onClick={handleSubmit} disabled={loading}>
            {loading ? <span className="spinner" /> : "🎊"} {t("submitBanquet")}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── ADMIN LOGIN ──────────────────────────────────────────────────────────────
function AdminLogin({ onLogin, lang }) {
  const t = (k) => translations[lang][k];
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState(false);

  const submit = () => {
    if (u === "admin" && p === "admin123") {
      localStorage.setItem("adminLoggedIn", "true");
      onLogin();
    } else {
      setErr(true);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh", padding: 24 }}>
      <div className="card" style={{ width: "100%", maxWidth: 400 }}>
        <div className="card-header" style={{ background: "var(--primary)", padding: "24px 28px" }}>
          <h2 style={{ color: "#fff", fontSize: "1.4rem" }}>🔐 {t("adminLogin")}</h2>
        </div>
        <div className="card-body">
          <div className="form-group">
            <label className="form-label">{t("username")}</label>
            <input className="form-control" value={u} onChange={e => { setU(e.target.value); setErr(false); }} />
          </div>
          <div className="form-group">
            <label className="form-label">{t("password")}</label>
            <input className="form-control" type="password" value={p}
              onChange={e => { setP(e.target.value); setErr(false); }}
              onKeyDown={e => e.key === "Enter" && submit()} />
          </div>
          {err && <div className="error-msg mb-4">{t("loginError")}</div>}
          <button className="btn btn-green" style={{ width: "100%" }} onClick={submit}>{t("login")}</button>
        </div>
      </div>
    </div>
  );
}

// ─── ADMIN DASHBOARD ──────────────────────────────────────────────────────────
function AdminDashboard({ onLogout, lang, showToast }) {
  const t = (k) => translations[lang][k];
  const [tab, setTab] = useState("menu");
  const [menuItems, setMenuItems] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [banquets, setBanquets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [newItem, setNewItem] = useState({ Name: "", Description: "", Price: "", Category: "", ImageUrl: "", Available: true });
  const [showAdd, setShowAdd] = useState(false);
  const [filterDate, setFilterDate] = useState("");

  const loadMenu = useCallback(() => {
    setLoading(true);
    airtableFetch("Menu").then(setMenuItems).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const loadReservations = useCallback(() => {
    setLoading(true);
    airtableFetch("Reservations", { sort: "Date" }).then(setReservations).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const loadBanquets = useCallback(() => {
    setLoading(true);
    airtableFetch("Banquets", { sort: "Date" }).then(setBanquets).catch(() => {}).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (tab === "menu") loadMenu();
    else if (tab === "reservations") loadReservations();
    else if (tab === "banquets") loadBanquets();
  }, [tab]);

  const handleDeleteMenu = async (id) => {
    if (!window.confirm(t("deleteConfirm"))) return;
    await airtableDelete("Menu", id);
    loadMenu();
  };

  const handleSaveEdit = async () => {
    if (!editItem) return;
    setLoading(true);
    await airtableUpdate("Menu", editItem.id, {
      Name: editItem.fields.Name,
      Description: editItem.fields.Description,
      Price: parseFloat(editItem.fields.Price),
      Category: editItem.fields.Category,
      ImageUrl: editItem.fields.ImageUrl || "",
      Available: editItem.fields.Available !== false,
    });
    setEditItem(null);
    loadMenu();
  };

  const handleAddNew = async () => {
    if (!newItem.Name || !newItem.Price) return;
    setLoading(true);
    await airtableCreate("Menu", {
      Name: newItem.Name,
      Description: newItem.Description,
      Price: parseFloat(newItem.Price),
      Category: newItem.Category,
      ImageUrl: newItem.ImageUrl || "",
      Available: true,
    });
    setNewItem({ Name: "", Description: "", Price: "", Category: "", ImageUrl: "", Available: true });
    setShowAdd(false);
    loadMenu();
  };

  const now = new Date();
  const filteredReservations = filterDate ? reservations.filter(r => r.fields.Date === filterDate) : reservations;
  const filteredBanquets = filterDate ? banquets.filter(b => b.fields.Date === filterDate) : banquets;
  const isUpcoming = (dateStr) => dateStr ? new Date(dateStr) >= now : false;

  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <div className="admin-sidebar-title">🌿 Admin</div>
        <button className={`sidebar-btn${tab === "menu" ? " active" : ""}`} onClick={() => setTab("menu")}>
          🍽️ {t("menuManagement")}
        </button>
        <button className={`sidebar-btn${tab === "reservations" ? " active" : ""}`} onClick={() => setTab("reservations")}>
          📅 {t("reservationsList")}
        </button>
        <button className={`sidebar-btn${tab === "banquets" ? " active" : ""}`} onClick={() => setTab("banquets")}>
          🎊 {t("banquetsList")}
        </button>
        <div style={{ flex: 1 }} />
        <button className="sidebar-btn" onClick={() => { localStorage.removeItem("adminLoggedIn"); onLogout(); }}>
          🚪 {t("logout")}
        </button>
      </div>

      <div className="admin-content">
        {/* MENU TAB */}
        {tab === "menu" && (
          <div className="fade-in">
            <div className="flex justify-between items-center mb-4" style={{ marginBottom: 20 }}>
              <h2 className="page-title" style={{ margin: 0 }}>{t("menuManagement")}</h2>
              <button className="btn btn-green btn-sm" onClick={() => setShowAdd(s => !s)}>+ {t("addDish")}</button>
            </div>

            {showAdd && (
              <div className="inline-edit mb-4" style={{ marginBottom: 16 }}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">{t("dishName")}</label>
                    <input className="form-control" value={newItem.Name} onChange={e => setNewItem(i => ({ ...i, Name: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">{t("category")}</label>
                    <input className="form-control" value={newItem.Category} onChange={e => setNewItem(i => ({ ...i, Category: e.target.value }))} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">{t("description")}</label>
                    <input className="form-control" value={newItem.Description} onChange={e => setNewItem(i => ({ ...i, Description: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">{t("price")} ₸</label>
                    <input className="form-control" type="number" value={newItem.Price} onChange={e => setNewItem(i => ({ ...i, Price: e.target.value }))} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">{t("imageUrl")}</label>
                  <input className="form-control" type="url" placeholder="https://example.com/image.jpg"
                    value={newItem.ImageUrl} onChange={e => setNewItem(i => ({ ...i, ImageUrl: e.target.value }))} />
                </div>
                {/* Preview */}
                {newItem.ImageUrl && (
                  <div style={{ marginBottom: 12 }}>
                    <img src={newItem.ImageUrl} alt="preview"
                      style={{ height: 80, borderRadius: 8, objectFit: "cover" }}
                      onError={e => { e.target.style.display = "none"; }} />
                  </div>
                )}
                <div className="flex gap-2">
                  <button className="btn btn-green btn-sm" onClick={handleAddNew}>{t("save")}</button>
                  <button className="btn btn-ghost btn-sm" onClick={() => setShowAdd(false)}>{t("cancel")}</button>
                </div>
              </div>
            )}

            {loading ? (
              <div className="loading-overlay"><div className="spinner spinner-dark" /></div>
            ) : (
              <div className="card">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th style={{ width: 60 }}>Фото</th>
                      <th>{t("dishName")}</th>
                      <th>{t("category")}</th>
                      <th>{t("description")}</th>
                      <th>{t("price")}</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {menuItems.length === 0 && (
                      <tr><td colSpan={6} style={{ textAlign: "center", color: "var(--text-muted)", padding: 32 }}>{t("noRecords")}</td></tr>
                    )}
                    {menuItems.map(item => (
                      editItem?.id === item.id ? (
                        <tr key={item.id}>
                          <td colSpan={6}>
                            <div className="inline-edit">
                              <div className="form-row">
                                <div className="form-group">
                                  <label className="form-label">{t("dishName")}</label>
                                  <input className="form-control" value={editItem.fields.Name}
                                    onChange={e => setEditItem(i => ({ ...i, fields: { ...i.fields, Name: e.target.value } }))} />
                                </div>
                                <div className="form-group">
                                  <label className="form-label">{t("category")}</label>
                                  <input className="form-control" value={editItem.fields.Category || ""}
                                    onChange={e => setEditItem(i => ({ ...i, fields: { ...i.fields, Category: e.target.value } }))} />
                                </div>
                              </div>
                              <div className="form-row">
                                <div className="form-group">
                                  <label className="form-label">{t("description")}</label>
                                  <input className="form-control" value={editItem.fields.Description || ""}
                                    onChange={e => setEditItem(i => ({ ...i, fields: { ...i.fields, Description: e.target.value } }))} />
                                </div>
                                <div className="form-group">
                                  <label className="form-label">{t("price")} ₸</label>
                                  <input className="form-control" type="number" value={editItem.fields.Price || ""}
                                    onChange={e => setEditItem(i => ({ ...i, fields: { ...i.fields, Price: e.target.value } }))} />
                                </div>
                              </div>
                              <div className="form-group">
                                <label className="form-label">{t("imageUrl")}</label>
                                <input className="form-control" type="url" placeholder="https://..."
                                  value={editItem.fields.ImageUrl || ""}
                                  onChange={e => setEditItem(i => ({ ...i, fields: { ...i.fields, ImageUrl: e.target.value } }))} />
                              </div>
                              {editItem.fields.ImageUrl && (
                                <div style={{ marginBottom: 12 }}>
                                  <img src={editItem.fields.ImageUrl} alt="preview"
                                    style={{ height: 80, borderRadius: 8, objectFit: "cover" }}
                                    onError={e => { e.target.style.display = "none"; }} />
                                </div>
                              )}
                              <div className="flex gap-2">
                                <button className="btn btn-green btn-xs" onClick={handleSaveEdit}>{t("save")}</button>
                                <button className="btn btn-ghost btn-xs" onClick={() => setEditItem(null)}>{t("cancel")}</button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        <tr key={item.id}>
                          <td>
                            {item.fields.ImageUrl ? (
                              <img src={item.fields.ImageUrl} alt={item.fields.Name}
                                className="admin-dish-thumb"
                                onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
                            ) : null}
                            <div className="admin-dish-thumb-placeholder"
                              style={{ display: item.fields.ImageUrl ? "none" : "flex" }}>🍽️</div>
                          </td>
                          <td style={{ fontWeight: 600 }}>{item.fields.Name}</td>
                          <td>{item.fields.Category}</td>
                          <td style={{ color: "var(--text-muted)", maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.fields.Description}</td>
                          <td style={{ fontWeight: 700, color: "var(--primary)" }}>{(item.fields.Price || 0).toLocaleString()} ₸</td>
                          <td>
                            <div className="flex gap-2">
                              <button className="btn btn-ghost btn-xs" onClick={() => setEditItem(item)}>{t("edit")}</button>
                              <button className="btn btn-danger btn-xs" onClick={() => handleDeleteMenu(item.id)}>{t("delete")}</button>
                            </div>
                          </td>
                        </tr>
                      )
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* RESERVATIONS TAB */}
        {tab === "reservations" && (
          <div className="fade-in">
            <div className="flex justify-between items-center mb-4" style={{ marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
              <h2 className="page-title" style={{ margin: 0 }}>{t("reservationsList")}</h2>
              <input type="date" className="form-control" style={{ width: "auto" }} value={filterDate}
                onChange={e => setFilterDate(e.target.value)} />
            </div>
            <div className="card" style={{ overflowX: "auto" }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>{t("dateLabel")}</th>
                    <th>{t("timeLabel")}</th>
                    <th>{t("hallLabel")}</th>
                    <th>#{t("tableLabel")}</th>
                    <th>{t("fullName")}</th>
                    <th>{t("phone")}</th>
                    <th>{t("status")}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReservations.length === 0 && (
                    <tr><td colSpan={7} style={{ textAlign: "center", color: "var(--text-muted)", padding: 32 }}>{t("noRecords")}</td></tr>
                  )}
                  {filteredReservations.map(r => (
                    <tr key={r.id}>
                      <td>{r.fields.Date}</td>
                      <td>{r.fields.TimeSlot} – {r.fields.EndTime}</td>
                      <td>{r.fields.Hall}</td>
                      <td>#{r.fields.TableNumber}</td>
                      <td style={{ fontWeight: 600 }}>{r.fields.GuestName}</td>
                      <td>{r.fields.Phone}</td>
                      <td>
                        <span className={`status-badge ${isUpcoming(r.fields.Date) ? "status-upcoming" : "status-past"}`}>
                          {isUpcoming(r.fields.Date) ? t("upcoming") : t("past")}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* BANQUETS TAB */}
        {tab === "banquets" && (
          <div className="fade-in">
            <div className="flex justify-between items-center mb-4" style={{ marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
              <h2 className="page-title" style={{ margin: 0 }}>{t("banquetsList")}</h2>
              <input type="date" className="form-control" style={{ width: "auto" }} value={filterDate}
                onChange={e => setFilterDate(e.target.value)} />
            </div>
            <div className="card" style={{ overflowX: "auto" }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>{t("dateLabel")}</th>
                    <th>{t("eventName")}</th>
                    <th>{t("contactName")}</th>
                    <th>{t("guestsCount")}</th>
                    <th>{t("menuType")}</th>
                    <th>{t("totalPrice")}</th>
                    <th>{t("status")}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBanquets.length === 0 && (
                    <tr><td colSpan={7} style={{ textAlign: "center", color: "var(--text-muted)", padding: 32 }}>{t("noRecords")}</td></tr>
                  )}
                  {filteredBanquets.map(b => (
                    <tr key={b.id}>
                      <td>{b.fields.Date}</td>
                      <td style={{ fontWeight: 600 }}>{b.fields.EventName}</td>
                      <td>{b.fields.ContactName}</td>
                      <td>{b.fields.Guests}</td>
                      <td><span className="badge badge-paid">{b.fields.MenuType}</span></td>
                      <td style={{ fontWeight: 700, color: "var(--primary)" }}>{(b.fields.TotalPrice || 0).toLocaleString()} ₸</td>
                      <td>
                        <span className={`status-badge ${isUpcoming(b.fields.Date) ? "status-upcoming" : "status-past"}`}>
                          {isUpcoming(b.fields.Date) ? t("upcoming") : t("past")}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "kz");
  const [page, setPage] = useState("home");
  const [adminLoggedIn, setAdminLoggedIn] = useState(() => localStorage.getItem("adminLoggedIn") === "true");
  const [toast, setToast] = useState(null);

  const handleSetLang = (l) => { setLang(l); localStorage.setItem("lang", l); };

  const showToast = useCallback((msg, type = "success") => {
    setToast({ msg, type, id: Date.now() });
  }, []);

  return (
    <>
      <GlobalStyles />
      {toast && (
        <Toast key={toast.id} msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />
      )}
      <Navbar page={page} setPage={setPage} lang={lang} setLang={handleSetLang} />
      <main>
        {page === "home" && <HomePage setPage={setPage} lang={lang} />}
        {page === "menu" && <MenuPage lang={lang} />}
        {page === "reservation" && <ReservationPage lang={lang} showToast={showToast} />}
        {page === "banquet" && <BanquetPage lang={lang} showToast={showToast} />}
        {page === "admin" && (
          adminLoggedIn
            ? <AdminDashboard onLogout={() => setAdminLoggedIn(false)} lang={lang} showToast={showToast} />
            : <AdminLogin onLogin={() => setAdminLoggedIn(true)} lang={lang} />
        )}
      </main>
    </>
  );
}