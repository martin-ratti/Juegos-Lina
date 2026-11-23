import type { PuzzleModel } from '../types';
import { INK, scallopPath } from '../utils/geometry';
import {
  FlowerEmblem,
  PolkaBow,
  RosyCheeks,
  StoryEyes,
} from '../utils/shapes';

const LION_MANE_PATH = scallopPath(150, 96, 56, 12, 13);

export const LEVEL_3_MODELS: PuzzleModel[] = [
  {
    id: 'leoncito',
    name: 'El Leoncito Sol',
    shortName: 'Leoncito',
    level: 3,
    cardBg: 'bg-[#FFF3CC]',
    lipClass: 'shadow-[0_8px_0_#D99A26]',
    boardDecor: 'sunny',
    pieces: [
      {
        id: 'mane',
        name: 'Melena',
        cropBox: '74 20 152 152',
        pegPoint: { x: 150, y: 40 },
        zOrder: 3,
        render: () => (
          <g>
            {/* Orejitas detrás */}
            <circle cx="104" cy="48" r="14" fill="#F9B84A" stroke={INK} strokeWidth="3" />
            <circle cx="104" cy="48" r="7" fill="#FFE0B5" />
            <circle cx="196" cy="48" r="14" fill="#F9B84A" stroke={INK} strokeWidth="3" />
            <circle cx="196" cy="48" r="7" fill="#FFE0B5" />
            {/* Melena festoneada paramétrica */}
            <path d={LION_MANE_PATH} fill="#EB7B35" stroke={INK} strokeWidth="3.2" strokeLinejoin="round" />
          </g>
        ),
      },
      {
        id: 'head',
        name: 'Carita',
        cropBox: '100 46 100 100',
        pegPoint: { x: 150, y: 96 },
        zOrder: 4,
        render: () => (
          <g>
            <circle cx="150" cy="96" r="40" fill="#FFD166" stroke={INK} strokeWidth="3.2" />
            {/* Hocico */}
            <ellipse cx="150" cy="112" rx="22" ry="15" fill="#FFF3D6" stroke={INK} strokeWidth="2.4" />
            <StoryEyes lx={132} rx={168} y={90} r={5.5} />
            <RosyCheeks lx={120} rx={180} y={104} rxSize={6.5} rySize={4} />
            {/* Nariz triangular */}
            <path
              d="M143 104 L157 104 L150 112 Z"
              fill="#B3472A"
              stroke={INK}
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            <path
              d="M150 112 L150 117 M140 118 Q145 123 150 118 Q155 123 160 118"
              fill="none"
              stroke={INK}
              strokeWidth="2.6"
              strokeLinecap="round"
            />
          </g>
        ),
      },
      {
        id: 'arms',
        name: 'Bracitos',
        cropBox: '54 156 192 66',
        pegPoint: { x: 84, y: 188 },
        zOrder: 1,
        render: () => (
          <g>
            <path
              d="M112 168 C86 164 64 176 66 194 C68 208 88 210 114 202 Z"
              fill="#FFD166"
              stroke={INK}
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
            <path
              d="M188 168 C214 164 236 176 234 194 C232 208 212 210 186 202 Z"
              fill="#FFD166"
              stroke={INK}
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
          </g>
        ),
      },
      {
        id: 'body',
        name: 'Pancita',
        cropBox: '94 146 112 122',
        pegPoint: { x: 150, y: 204 },
        zOrder: 2,
        render: () => (
          <g>
            <ellipse
              cx="150"
              cy="206"
              rx="46"
              ry="50"
              fill="#FFD166"
              stroke={INK}
              strokeWidth="3.2"
            />
            <ellipse cx="150" cy="208" rx="28" ry="34" fill="#FFF3D6" />
          </g>
        ),
      },
      {
        id: 'legs',
        name: 'Patitas',
        cropBox: '84 226 132 64',
        pegPoint: { x: 116, y: 256 },
        zOrder: 3,
        render: () => (
          <g>
            <ellipse cx="116" cy="256" rx="22" ry="18" fill="#FFD166" stroke={INK} strokeWidth="3.2" />
            <ellipse cx="116" cy="258" rx="10" ry="8" fill="#FFA6BA" />
            <circle cx="106" cy="245" r="3" fill="#FFA6BA" />
            <circle cx="116" cy="243" r="3" fill="#FFA6BA" />
            <circle cx="126" cy="245" r="3" fill="#FFA6BA" />

            <ellipse cx="184" cy="256" rx="22" ry="18" fill="#FFD166" stroke={INK} strokeWidth="3.2" />
            <ellipse cx="184" cy="258" rx="10" ry="8" fill="#FFA6BA" />
            <circle cx="174" cy="245" r="3" fill="#FFA6BA" />
            <circle cx="184" cy="243" r="3" fill="#FFA6BA" />
            <circle cx="194" cy="245" r="3" fill="#FFA6BA" />
          </g>
        ),
      },
      {
        id: 'tail',
        name: 'Colita',
        cropBox: '188 180 86 90',
        pegPoint: { x: 246, y: 206 },
        zOrder: 1,
        render: () => (
          <g>
            <path
              d="M194 240 C226 242 248 224 248 198"
              fill="none"
              stroke={INK}
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d="M194 240 C226 242 248 224 248 198"
              fill="none"
              stroke="#FFD166"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M248 184 C258 186 264 198 256 206 C246 212 238 202 248 184 Z"
              fill="#EB7B35"
              stroke={INK}
              strokeWidth="2.8"
              strokeLinejoin="round"
            />
          </g>
        ),
      },
    ],
  },
  {
    id: 'munequita',
    name: 'La Muñequita',
    shortName: 'Muñequita',
    level: 3,
    cardBg: 'bg-[#FFEAF1]',
    lipClass: 'shadow-[0_8px_0_#D96B88]',
    boardDecor: 'meadow',
    pieces: [
      {
        id: 'hair',
        name: 'Pelo',
        cropBox: '66 18 168 78',
        pegPoint: { x: 150, y: 42 },
        zOrder: 4,
        render: () => (
          <g>
            {/* Colitas esponjosas */}
            <circle cx="94" cy="60" r="19" fill="#7B4B2A" stroke={INK} strokeWidth="3" />
            <circle cx="206" cy="60" r="19" fill="#7B4B2A" stroke={INK} strokeWidth="3" />
            {/* Corona y flequillo curvo */}
            <path
              d="M104 68 C102 32 126 26 150 26 C174 26 198 32 196 68 C180 54 165 50 150 56 C135 50 120 54 104 68 Z"
              fill="#8D5834"
              stroke={INK}
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <path
              d="M128 36 Q150 30 172 36"
              fill="none"
              stroke="#B57A50"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Moños frutilla */}
            <PolkaBow cx={104} cy={47} scale={0.9} rotate={-24} />
            <PolkaBow cx={196} cy={47} scale={0.9} rotate={24} />
          </g>
        ),
      },
      {
        id: 'head',
        name: 'Carita',
        cropBox: '98 46 104 94',
        pegPoint: { x: 150, y: 92 },
        zOrder: 3,
        render: () => (
          <g>
            <circle cx="110" cy="92" r="9" fill="#FBC4A3" stroke={INK} strokeWidth="2.8" />
            <circle cx="190" cy="92" r="9" fill="#FBC4A3" stroke={INK} strokeWidth="2.8" />
            <rect
              x="112"
              y="52"
              width="76"
              height="78"
              rx="38"
              fill="#FFD6BC"
              stroke={INK}
              strokeWidth="3"
            />
            <StoryEyes lx={134} rx={166} y={90} r={5.8} lashes />
            <RosyCheeks lx={123} rx={177} y={102} rxSize={6.5} rySize={4} />
            <path d="M148 98 Q150 101 152 98" fill="none" stroke="#C98272" strokeWidth="2.4" strokeLinecap="round" />
            <path
              d="M140 108 Q150 118 160 108"
              fill="none"
              stroke={INK}
              strokeWidth="2.8"
              strokeLinecap="round"
            />
          </g>
        ),
      },
      {
        id: 'leftArm',
        name: 'Brazo izq.',
        cropBox: '54 128 60 88',
        pegPoint: { x: 80, y: 174 },
        zOrder: 1,
        render: () => (
          <g>
            {/* Mano */}
            <circle cx="74" cy="196" r="11" fill="#FFD6BC" stroke={INK} strokeWidth="3" />
            {/* Brazo */}
            <path
              d="M104 140 C86 144 74 164 68 188 L84 190 C90 174 96 164 108 158 Z"
              fill="#FFD6BC"
              stroke={INK}
              strokeWidth="3"
              strokeLinejoin="round"
            />
            {/* Manga abullonada */}
            <ellipse
              cx="96"
              cy="150"
              rx="15"
              ry="14"
              transform="rotate(20 96 150)"
              fill="#FFA6BA"
              stroke={INK}
              strokeWidth="3"
            />
          </g>
        ),
      },
      {
        id: 'rightArm',
        name: 'Brazo der.',
        cropBox: '186 128 60 88',
        pegPoint: { x: 220, y: 174 },
        zOrder: 1,
        render: () => (
          <g>
            <circle cx="226" cy="196" r="11" fill="#FFD6BC" stroke={INK} strokeWidth="3" />
            <path
              d="M196 140 C214 144 226 164 232 188 L216 190 C210 174 204 164 192 158 Z"
              fill="#FFD6BC"
              stroke={INK}
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <ellipse
              cx="204"
              cy="150"
              rx="15"
              ry="14"
              transform="rotate(-20 204 150)"
              fill="#FFA6BA"
              stroke={INK}
              strokeWidth="3"
            />
          </g>
        ),
      },
      {
        id: 'torso',
        name: 'Vestido',
        cropBox: '92 122 116 108',
        pegPoint: { x: 150, y: 180 },
        zOrder: 2,
        render: () => (
          <g>
            {/* Cuello */}
            <rect x="140" y="124" width="20" height="18" rx="6" fill="#FFD6BC" stroke={INK} strokeWidth="2.8" />
            {/* Vestido acampanado */}
            <path
              d="M118 138 L182 138 L198 216 Q150 226 102 216 Z"
              fill="#F25C78"
              stroke={INK}
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
            {/* Vuelo blanco inferior */}
            <path
              d="M104 208 Q150 218 196 208 L198 216 Q150 226 102 216 Z"
              fill="#FFFDF9"
              stroke={INK}
              strokeWidth="2.4"
              strokeLinejoin="round"
            />
            {/* Cuellito Peter Pan */}
            <path
              d="M126 138 C128 152 144 152 150 142 C156 152 172 152 174 138 Z"
              fill="#FFFDF9"
              stroke={INK}
              strokeWidth="2.6"
              strokeLinejoin="round"
            />
            {/* Flor margarita */}
            <FlowerEmblem cx={150} cy={178} petalRadius={5.8} />
          </g>
        ),
      },
      {
        id: 'leftLeg',
        name: 'Pierna izq.',
        cropBox: '104 206 46 88',
        pegPoint: { x: 129, y: 248 },
        zOrder: 1,
        render: () => (
          <g>
            <rect x="120" y="212" width="18" height="46" rx="7" fill="#FFD6BC" stroke={INK} strokeWidth="2.8" />
            {/* Medias rayadas */}
            <rect x="120" y="242" width="18" height="20" fill="#FFFDF9" stroke={INK} strokeWidth="2.6" />
            <line x1="120" y1="249" x2="138" y2="249" stroke="#5BC0EB" strokeWidth="3" />
            {/* Zapatito guillermina */}
            <path
              d="M108 268 C108 278 142 278 142 268 C142 258 124 256 112 262 C108 264 108 266 108 268 Z"
              fill="#F25C78"
              stroke={INK}
              strokeWidth="2.8"
            />
            <circle cx="129" cy="262" r="2.6" fill="#FFBE3D" />
          </g>
        ),
      },
      {
        id: 'rightLeg',
        name: 'Pierna der.',
        cropBox: '150 206 46 88',
        pegPoint: { x: 171, y: 248 },
        zOrder: 1,
        render: () => (
          <g>
            <rect x="162" y="212" width="18" height="46" rx="7" fill="#FFD6BC" stroke={INK} strokeWidth="2.8" />
            <rect x="162" y="242" width="18" height="20" fill="#FFFDF9" stroke={INK} strokeWidth="2.6" />
            <line x1="162" y1="249" x2="180" y2="249" stroke="#5BC0EB" strokeWidth="3" />
            <path
              d="M158 268 C158 278 192 278 192 268 C192 266 192 264 188 262 C176 256 158 258 158 268 Z"
              fill="#F25C78"
              stroke={INK}
              strokeWidth="2.8"
            />
            <circle cx="171" cy="262" r="2.6" fill="#FFBE3D" />
          </g>
        ),
      },
    ],
  },
];
