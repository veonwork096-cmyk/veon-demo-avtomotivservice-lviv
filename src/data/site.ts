// Facts only from veon/client.json (W-F003…W-F008, products_services, contacts). Nothing invented.
export const PHONE_TEXT = "0800 33 77 79";
export const PHONE_HREF = "tel:0800337779";
export const BOT_HREF = "https://t.me/AVTOMOTIV_SERVICE_chat_bot";
export const MAP_HREF = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("вул. Хлібна, 4, Львів");
export const NOTE = "Розділ у розробці";

export const SOCIALS = [
  { name: "Facebook", icon: "facebook", href: "https://www.facebook.com/avtomotivservice" },
  { name: "Instagram", icon: "instagram", href: "https://www.instagram.com/avtomotivservice/" },
  { name: "TikTok", icon: "tiktok", href: "https://www.tiktok.com/@avtomotivservice" },
] as const;

export const NAV = [
  { href: "#services", label: "Послуги" },
  { href: "#terms", label: "Умови" },
  { href: "#reviews", label: "Відгуки" },
  { href: "#brands", label: "Марки" },
  { href: "#contacts", label: "Контакти" },
] as const;

// products_services[1–6]
export const SERVICE_GROUPS = [
  { name: "Ходова", works: "Вібростенд, 3D розвал-сходження, заміна амортизаторів, сайлентблоків, подушок двигуна" },
  { name: "Гальма", works: "Діагностика, заміна дисків і колодок, проточка дисків" },
  { name: "Двигун", works: "Заміна мастила, заміна ГРМ (ланцюг або ремінь), ремонт двигуна, ремонт турбіни, чищення впускного колектора" },
  { name: "Трансмісія", works: "Заміна мастила в АКПП, ремонт МКПП" },
  { name: "Електрика, кондиціонер, фари", works: "Автоелектрик, обслуговування кондиціонера, регулювання фар" },
  { name: "Технічні рідини", works: "Заміна рідин: гальмівна, охолоджувальна, у диференціалі, КПП і ГПК" },
] as const;

// Selected Google reviews, verbatim from content/reviews.md
export const REVIEWS = [
  { author: "Антон Зинченко", text: "Максимально задоволений сервісом! Професійно, швидко, якісно. Навіть відношення до клієнта заслуговує окремої похвали" },
  { author: "Юрий Шевченко", text: "Кваліфіковані працівники, що на сьогодні велика рідкість. Якістю ремонту дуже задоволений. Рекомендую." },
  { author: "Yurii Prenser", text: "Рекомендую! Швидко та якісно. Адекватні ціни. Привітні менеджера. Все розказали, пояснили та усунули проблему" },
] as const;

export const BRANDS = {
  vag: ["Audi", "Volkswagen", "Skoda"],
  premium: ["Porsche", "Mercedes-Benz", "Land Rover", "BMW", "Toyota", "Lexus"],
  more: ["Mini", "Hyundai", "Ford", "Mazda", "Kia", "Nissan", "Mitsubishi", "Honda"],
} as const;
