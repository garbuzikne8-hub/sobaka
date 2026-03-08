# Project Rules

## Figma Source of Truth
- Працюємо тільки з цим узгодженим макетом Figma: `https://www.figma.com/design/I3zLNBH9ZJA64r7L5tXMHF/Ksantia?node-id=164-952&t=C4wqMz6jimKm4mdd-1`.
- Якщо з'являється новий лінк, оновлюємо цей пункт перед початком робіт.

## Assets (Images)
- Усі фото/зображення тягнемо в проєкт локально.
- Базова папка для них: `images/` ("імідж").
- Всередині `images/` дозволена класифікація по підпапках (наприклад: `images/hero/`, `images/icons/`, `images/content/`).

## Units
- Усі розміри задаємо тільки у пікселях (`px`).
- `rem` для розмірів у цьому проєкті не використовуємо.

## Text Tags and CMS Content
- Для текстових і контентних тегів `p`, `ul`, `li`, `ol`, `span`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `a`, `strong`, `b`, `em`, `i`, `small`, `mark`, `blockquote`, `q`, `cite`, `code`, `pre`, `sub`, `sup`, `br`, `hr`, `dl`, `dt`, `dd`, `figure`, `figcaption`, `table`, `thead`, `tbody`, `tr`, `th`, `td` стилі задаємо тільки через батьківський клас.
- На самі ці теги не додаємо класи, якщо це контент, який може змінюватися через адмін-панель (CMS/WYSIWYG).

## Visual QA
- Головні розбіжності з макетом обов'язково фіксуємо через скіл `visual-pixel-perfect` (піксель перфект).
