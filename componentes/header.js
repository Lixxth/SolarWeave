import { DropletIcon, SettingsIcon } from "lucide-react"
import Image from 'next/image'; // Si usas Next.js, de lo contrario usa el componente de imagen correspondiente.

const Header = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-20">
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-90" />
        <Image
          src="/OlasHeader.png"
          alt="Water waves"
          width={1200}
          height={200}
          className="w-full h-[140px] object-cover"
          priority
        />
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <DropletIcon className="h-8 w-8 text-white" />
            <h1 className="text-2xl font-bold text-white ml-10">AquaDetect</h1>
          </div>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <SettingsIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Header;
