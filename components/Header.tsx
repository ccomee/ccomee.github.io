import React from 'react';

// The colors for the gradient banner.
// Generated from resources/Gradients p[1-4].png
const gradientString = `linear-gradient(to right,
  rgb(255, 1, 81) 0.00%,
  rgb(255, 7, 77) 1.04%,
  rgb(255, 14, 74) 2.08%,
  rgb(255, 21, 71) 3.12%,
  rgb(255, 28, 67) 4.16%,
  rgb(255, 34, 64) 5.20%,
  rgb(255, 41, 60) 6.25%,
  rgb(255, 48, 57) 7.29%,
  rgb(255, 54, 54) 8.33%,
  rgb(255, 61, 50) 9.37%,
  rgb(255, 68, 47) 10.41%,
  rgb(255, 74, 44) 11.45%,
  rgb(255, 81, 40) 12.49%,
  rgb(255, 88, 37) 13.53%,
  rgb(255, 95, 33) 14.57%,
  rgb(255, 101, 30) 15.61%,
  rgb(255, 108, 27) 16.65%,
  rgb(255, 115, 23) 17.69%,
  rgb(255, 121, 20) 18.73%,
  rgb(255, 128, 17) 19.78%,
  rgb(255, 135, 13) 20.82%,
  rgb(255, 141, 10) 21.86%,
  rgb(255, 148, 6) 22.90%,
  rgb(255, 155, 3) 23.94%,
  rgb(255, 161, 0) 24.98%,
  rgb(255, 197, 0) 25.02%,
  rgb(255, 211, 0) 26.06%,
  rgb(255, 225, 0) 27.10%,
  rgb(245, 230, 0) 28.14%,
  rgb(232, 232, 0) 29.18%,
  rgb(219, 234, 0) 30.22%,
  rgb(206, 236, 0) 31.26%,
  rgb(192, 238, 0) 32.30%,
  rgb(180, 240, 0) 33.34%,
  rgb(167, 242, 0) 34.38%,
  rgb(154, 244, 0) 35.42%,
  rgb(141, 246, 0) 36.46%,
  rgb(128, 248, 0) 37.50%,
  rgb(115, 250, 0) 38.54%,
  rgb(101, 252, 0) 39.58%,
  rgb(88, 254, 0) 40.62%,
  rgb(77, 255, 7) 41.66%,
  rgb(68, 255, 20) 42.70%,
  rgb(58, 255, 33) 43.74%,
  rgb(48, 255, 46) 44.78%,
  rgb(39, 255, 59) 45.82%,
  rgb(29, 255, 72) 46.86%,
  rgb(19, 255, 84) 47.90%,
  rgb(10, 255, 97) 48.94%,
  rgb(0, 255, 110) 49.98%,
  rgb(0, 253, 241) 50.02%,
  rgb(3, 243, 242) 51.06%,
  rgb(6, 232, 242) 52.10%,
  rgb(8, 221, 243) 53.14%,
  rgb(11, 211, 243) 54.18%,
  rgb(14, 200, 244) 55.22%,
  rgb(16, 190, 245) 56.26%,
  rgb(19, 179, 245) 57.30%,
  rgb(22, 168, 246) 58.34%,
  rgb(24, 158, 246) 59.38%,
  rgb(27, 147, 247) 60.42%,
  rgb(30, 136, 248) 61.46%,
  rgb(32, 126, 248) 62.50%,
  rgb(35, 115, 249) 63.54%,
  rgb(38, 104, 249) 64.58%,
  rgb(40, 94, 250) 65.62%,
  rgb(43, 83, 250) 66.66%,
  rgb(46, 73, 251) 67.70%,
  rgb(48, 62, 252) 68.74%,
  rgb(51, 51, 252) 69.78%,
  rgb(54, 41, 253) 70.82%,
  rgb(56, 30, 253) 71.86%,
  rgb(59, 20, 254) 72.90%,
  rgb(62, 9, 255) 73.94%,
  rgb(64, 0, 255) 74.98%,
  rgb(135, 0, 255) 75.02%,
  rgb(140, 0, 249) 76.06%,
  rgb(145, 0, 243) 77.10%,
  rgb(150, 0, 236) 78.14%,
  rgb(155, 0, 230) 79.18%,
  rgb(160, 0, 224) 80.22%,
  rgb(165, 0, 218) 81.27%,
  rgb(170, 0, 211) 82.31%,
  rgb(175, 0, 205) 83.35%,
  rgb(180, 0, 199) 84.39%,
  rgb(185, 0, 193) 85.43%,
  rgb(190, 0, 187) 86.47%,
  rgb(195, 0, 180) 87.51%,
  rgb(200, 0, 174) 88.55%,
  rgb(205, 0, 168) 89.59%,
  rgb(210, 0, 162) 90.63%,
  rgb(215, 0, 156) 91.67%,
  rgb(220, 0, 149) 92.71%,
  rgb(225, 0, 143) 93.75%,
  rgb(230, 0, 137) 94.80%,
  rgb(235, 0, 131) 95.84%,
  rgb(240, 0, 125) 96.88%,
  rgb(245, 0, 118) 97.92%,
  rgb(250, 0, 112) 98.96%,
  rgb(255, 0, 106) 100.00%
)`;

// Base64-encoded transparent PNG ref: https://png-pixel.com/
// We now use public/banner_mask.png

interface HeaderProps {
    bgPosition: number;
}

const Header: React.FC<HeaderProps> = ({ bgPosition }) => {
    const headerStyle = {
        backgroundImage: gradientString,
        backgroundSize: '400% 100%',
        backgroundPosition: `${bgPosition}% 50%`,
    };

    return (
        <div className="relative w-full">
            {/* Gradient Background */}
            <div
                className="absolute inset-0"
                style={headerStyle}
                aria-hidden="true"
            />
            {/* Image Overlay */}
            <img
                src="/banner_mask.png"
                alt="Values of Maman Chercheuse"
                className="relative w-full h-auto object-cover pointer-events-none"
            />
            {/* Logo Overlay */}
            <a
                href="/"
                className="absolute top-[50%] left-1/2 w-[45%] -translate-x-1/2 -translate-y-1/2 z-10 block"
                aria-label="Retour à l'accueil"
            >
                <img
                    src="/images/logo_maman_chercheuse.png"
                    alt="Logo Maman Chercheuse"
                    className="w-full h-auto object-cover"
                />
            </a>
        </div>
    );
};

export default Header;