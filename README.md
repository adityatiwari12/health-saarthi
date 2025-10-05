# 🏥 Medical Emergency & MiBand Integration Platform

A comprehensive healthcare platform that combines **real-time ambulance services** with **MiBand fitness tracking** for emergency situations. Built with React, TypeScript, and modern web technologies.

## 🌟 Features

### 🚑 Ambulance Services
- **Real-time ambulance tracking** with interactive Leaflet maps
- **GPS location detection** with permission handling
- **Road-based routing** using OpenStreetMap Routing Machine (OSRM)
- **Clickable ambulance markers** with booking functionality
- **Smooth ambulance movement** along actual road networks
- **Hospital finder** with nearby medical facilities
- **Emergency contacts** management
- **One-click emergency services** (Ambulance, Police, Fire)

### ⌚ MiBand Integration
- **Bluetooth connectivity** to MiBand devices (Mi Band 4)
- **5-step connection process** with detailed status updates
- **Activity tracking** - Steps, distance, calories
- **Battery monitoring** - Real-time battery level and charging status
- **Device management** - Find band, sync time, settings
- **Secure authentication** with auth key support

### 🎨 Modern UI/UX
- **Responsive design** that works on all devices
- **Frosted glass effects** with modern styling
- **Smooth animations** using Framer Motion
- **Dark/Light theme support**
- **Interactive dashboards** with real-time data

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Modern browser with Bluetooth support (for MiBand features)
- HTTPS connection (required for geolocation and Bluetooth)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd inno
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:8080
   ```

## 📦 Tech Stack

### Core Framework
- **React 18.3.1** - Modern React with hooks
- **TypeScript 5.5.3** - Type-safe development
- **Vite 6.2.2** - Fast build tool and dev server

### UI & Styling
- **Tailwind CSS 3.4.11** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Framer Motion 12.6.2** - Smooth animations
- **Lucide React** - Beautiful icons

### Maps & Location
- **Leaflet 1.9.4** - Interactive maps
- **OpenStreetMap** - Map tiles
- **OSRM API** - Road-based routing
- **Geolocation API** - User location detection

### Bluetooth & Hardware
- **Web Bluetooth API** - MiBand connectivity
- **IndexedDB (IDB)** - Local data storage

### Development Tools
- **ESLint & Prettier** - Code formatting
- **Vitest** - Testing framework
- **SWC** - Fast compilation

## 🗂️ Project Structure

```
inno/
├── client/                    # Frontend React application
│   ├── components/           # Reusable UI components
│   ├── contexts/            # React contexts (Sidebar, MiBand)
│   ├── hooks/               # Custom React hooks
│   ├── miband/              # MiBand integration logic
│   │   ├── band-connection.ts    # Bluetooth connection handling
│   │   └── MiBandContext.tsx     # MiBand state management
│   ├── pages/               # Application pages
│   │   └── AmbulanceServices.tsx # Main ambulance service page
│   └── ui/                  # UI component library
├── netlify/                 # Netlify deployment functions
├── public/                  # Static assets
├── MIBAND_REALTIME_GUIDE.md # MiBand setup guide
└── package.json            # Dependencies and scripts
```

## 🚑 Ambulance Service Usage

1. **Allow location access** when prompted
2. **View nearby hospitals** and ambulances on the interactive map
3. **Click any ambulance marker** to see details
4. **Click "Book Ambulance"** in the popup
5. **Watch real-time tracking** as ambulance moves along roads
6. **Receive arrival notification** when ambulance reaches you

### Map Features
- 🏥 **Hospital markers** - Click to see details and contact info
- 🚑 **Ambulance markers** - Click to book and track
- 📍 **Your location** - Blue marker showing your position
- 🛣️ **Route visualization** - Blue line showing ambulance path

## ⌚ MiBand Setup

1. **Navigate to MiBand section** (`/dashboard/miband`)
2. **Click "Open Band"** to start connection
3. **Follow the 5-step process**:
   - 🔄 Reauthorizing
   - 🔍 Searching for Device  
   - 🔗 Connecting
   - ⚙️ Getting Service
   - 🔐 Authenticating
4. **View activity data** - Steps, battery, device info

> **Note**: Requires HTTPS and modern browser with Bluetooth support

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
# Add any API keys or configuration here
VITE_APP_NAME=Medical Emergency Platform
```

### MiBand Auth Key
- Follow the MiBand pairing guide in `MIBAND_REALTIME_GUIDE.md`
- Obtain your device's auth key for secure connection

## 🌐 Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run start
```

### Netlify Deployment
The project is configured for Netlify deployment with:
- Automatic builds from Git
- Serverless functions support
- HTTPS by default (required for geolocation/Bluetooth)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📱 Browser Compatibility

- **Chrome 89+** (recommended)
- **Firefox 90+**
- **Safari 14+**
- **Edge 89+**

> **Requirements**: HTTPS connection for geolocation and Bluetooth APIs

## 🔒 Privacy & Security

- **Location data** is only used for ambulance services and not stored
- **Bluetooth connections** are secure and local to your device
- **Health data** from MiBand stays on your device
- **No personal data** is transmitted to external servers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the browser console for error messages
2. Ensure HTTPS connection for location/Bluetooth features
3. Verify MiBand compatibility and pairing
4. Open an issue on GitHub with detailed information

## 🙏 Acknowledgments

- **OpenStreetMap** for map data
- **OSRM** for routing services
- **Radix UI** for accessible components
- **Tailwind CSS** for styling system
- **MiBand community** for device integration insights

---

**Built with ❤️ for emergency healthcare and fitness tracking**
