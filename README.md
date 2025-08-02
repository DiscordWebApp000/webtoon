# WebtoonHub - Modern Webtoon Platform

A modern webtoon platform built with Next.js, TypeScript, and Tailwind CSS, inspired by popular webtoon sites like Tapas.

## 🚀 Features

### ✨ **Interactive Hero Slider**
- Auto-sliding hero section with 3 featured webtoons
- Manual navigation with arrow buttons
- Slide indicators for easy navigation
- Smooth transitions and animations

### 🎨 **Modern UI Design**
- Clean, professional layout similar to Tapas
- Responsive design for all devices
- Mobile-friendly navigation with hamburger menu
- Smooth scrolling webtoon cards

### 📱 **Responsive Design**
- Mobile-first approach
- Collapsible navigation menu
- Adaptive search bar
- Touch-friendly interactions

### 🎯 **Webtoon Categories**
- **Event Webtoons** - Special promotions and events
- **New Releases** - Latest webtoons with UP badges
- **Popular Series** - Trending webtoons
- **Free Access** - Available for free reading
- **Completed Series** - Finished webtoons

## 🛠 **Technologies Used**

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern component library
- **Lucide React** - Beautiful icons

## 🚀 **Getting Started**

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 **Project Structure**

```
src/
├── app/
│   ├── globals.css      # Global styles and animations
│   ├── layout.tsx       # Root layout component
│   └── page.tsx         # Home page
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── Header.tsx       # Navigation header
│   ├── FilterNav.tsx    # Category filters
│   ├── HeroSection.tsx  # Interactive slider
│   ├── WebtoonCard.tsx  # Individual webtoon card
│   ├── WebtoonGrid.tsx  # Scrollable webtoon grid
│   └── FloatingHelp.tsx # Help button
└── lib/
    └── utils.ts         # Utility functions
```

## 🎨 **Key Components**

### **HeroSection**
- Auto-sliding banner with featured webtoons
- Manual navigation controls
- Slide indicators
- Smooth transitions

### **WebtoonGrid**
- Horizontal scrollable layout
- 20+ webtoon cards with variety
- Event badges and status indicators
- Hover effects and animations

### **Header**
- Responsive navigation
- Mobile hamburger menu
- Search functionality
- User action buttons

## 🔧 **Customization**

### **Adding New Webtoons**
Edit `src/components/WebtoonGrid.tsx` and add new webtoon objects to the `webtoonData` array:

```typescript
{
  title: "Your Webtoon Title",
  imageUrl: "https://your-image-url.com",
  isEvent: true,  // Optional: for event badges
  isUp: true,     // Optional: for UP badges
  dateRange: "07/27-07/30"  // Optional: for date ranges
}
```

### **Modifying Hero Slides**
Edit `src/components/HeroSection.tsx` and update the `heroSlides` array with your featured content.

## 📱 **Responsive Breakpoints**

- **Mobile**: < 640px
- **Tablet**: 640px - 768px
- **Desktop**: > 768px

## 🎯 **Future Enhancements**

- [ ] User authentication system
- [ ] Webtoon reading functionality
- [ ] User profiles and favorites
- [ ] Advanced search and filtering
- [ ] Comments and ratings
- [ ] Dark mode support
- [ ] PWA capabilities

## 📄 **License**

This project is open source and available under the [MIT License](LICENSE).
