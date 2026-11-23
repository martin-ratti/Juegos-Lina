import type { PuzzleModel } from '../types';
import { INK, starPath } from '../utils/geometry';
import { RosyCheeks, StoryEyes } from '../utils/shapes';

export const LEVEL_2_MODELS: PuzzleModel[] = [
  {
    id: 'mariposa',
    name: 'La Mariposa Lili',
    shortName: 'Mariposa',
    level: 2,
    cardBg: 'bg-[#FFE8F0]',
    lipClass: 'shadow-[0_8px_0_#E06C92]',
    boardDecor: 'meadow',
    pieces: [
      {
        id: 'head',
        name: 'Carita',
        cropBox: '104 34 92 94',
        pegPoint: { x: 150, y: 88 },
        zOrder: 4,
        render: () => (
          <g>
            {/* Antenas con corazones/bolitas */}
            <path d="M138 66 Q128 42 118 46" fill="none" stroke={INK} strokeWidth="3.2" strokeLinecap="round" />
            <path d="M162 66 Q172 42 182 46" fill="none" stroke={INK} strokeWidth="3.2" strokeLinecap="round" />
            <circle cx="117" cy="46" r="7" fill="#FFBE3D" stroke={INK} strokeWidth="2.8" />
            <circle cx="183" cy="46" r="7" fill="#FFBE3D" stroke={INK} strokeWidth="2.8" />
            {/* Cabeza */}
            <circle cx="150" cy="92" r="28" fill="#FFE0B5" stroke={INK} strokeWidth="3.2" />
            <StoryEyes lx={139} rx={161} y={90} r={4.8} lashes />
            <RosyCheeks lx={131} rx={169} y={99} rxSize={5.5} rySize={3.5} />
            <path
              d="M142 103 Q150 111 158 103"
              fill="none"
              stroke={INK}
              strokeWidth="2.8"
              strokeLinecap="round"
            />
          </g>
        ),
      },
      {
        id: 'body',
        name: 'Cuerpito',
        cropBox: '122 108 56 156',
        pegPoint: { x: 150, y: 184 },
        zOrder: 3,
        render: () => (
          <g>
            <rect
              x="133"
              y="114"
              width="34"
              height="138"
              rx="17"
              fill="#C8A2F6"
              stroke={INK}
              strokeWidth="3.2"
            />
            <path d="M136 146 Q150 152 164 146" fill="none" stroke="#FFF8EE" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M136 174 Q150 180 164 174" fill="none" stroke="#FFF8EE" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M136 202 Q150 208 164 202" fill="none" stroke="#FFF8EE" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M138 228 Q150 234 162 228" fill="none" stroke="#FFF8EE" strokeWidth="3.5" strokeLinecap="round" />
          </g>
        ),
      },
      {
        id: 'leftWing',
        name: 'Ala izq.',
        cropBox: '24 68 122 116',
        pegPoint: { x: 84, y: 124 },
        zOrder: 2,
        render: () => (
          <g>
            <path
              d="M138 134 C108 74 36 68 34 116 C32 152 74 176 138 168 Z"
              fill="#F25C78"
              stroke={INK}
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
            <circle cx="72" cy="116" r="17" fill="#FFBE3D" stroke={INK} strokeWidth="2.6" />
            <circle cx="104" cy="144" r="9" fill="#FFF8EE" stroke={INK} strokeWidth="2.2" />
            <circle cx="56" cy="142" r="7" fill="#5BC0EB" stroke={INK} strokeWidth="2.2" />
          </g>
        ),
      },
      {
        id: 'rightWing',
        name: 'Ala der.',
        cropBox: '154 68 122 116',
        pegPoint: { x: 216, y: 124 },
        zOrder: 2,
        render: () => (
          <g>
            <path
              d="M162 134 C192 74 264 68 266 116 C268 152 226 176 162 168 Z"
              fill="#F25C78"
              stroke={INK}
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
            <circle cx="228" cy="116" r="17" fill="#FFBE3D" stroke={INK} strokeWidth="2.6" />
            <circle cx="196" cy="144" r="9" fill="#FFF8EE" stroke={INK} strokeWidth="2.2" />
            <circle cx="244" cy="142" r="7" fill="#5BC0EB" stroke={INK} strokeWidth="2.2" />
          </g>
        ),
      },
      {
        id: 'bottomWings',
        name: 'Alitas abajo',
        cropBox: '44 162 212 108',
        pegPoint: { x: 92, y: 218 },
        zOrder: 1,
        render: () => (
          <g>
            <path
              d="M138 172 C92 174 52 196 58 230 C64 256 108 262 138 228 Z"
              fill="#5BC0EB"
              stroke={INK}
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
            <circle cx="88" cy="220" r="12" fill="#FFF8EE" stroke={INK} strokeWidth="2.4" />
            <path
              d="M162 172 C208 174 248 196 242 230 C236 256 192 262 162 228 Z"
              fill="#5BC0EB"
              stroke={INK}
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
            <circle cx="212" cy="220" r="12" fill="#FFF8EE" stroke={INK} strokeWidth="2.4" />
          </g>
        ),
      },
    ],
  },
  {
    id: 'unicornio',
    name: 'El Unicornio Iris',
    shortName: 'Unicornio',
    level: 2,
    cardBg: 'bg-[#E5F7FF]',
    lipClass: 'shadow-[0_8px_0_#4BA3C7]',
    boardDecor: 'sky',
    pieces: [
      {
        id: 'mane',
        name: 'Cuerno y crin',
        cropBox: '126 24 126 132',
        pegPoint: { x: 192, y: 52 },
        zOrder: 4,
        render: () => (
          <g>
            {/* Crin arcoíris detrás de la cabeza */}
            <path
              d="M144 64 C118 76 116 114 134 146 L160 138 C148 112 152 84 162 72 Z"
              fill="#C8A2F6"
              stroke={INK}
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <path
              d="M148 76 C132 92 134 116 144 138"
              fill="none"
              stroke="#5BC0EB"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* Orejita */}
            <path
              d="M160 72 L154 44 L176 64 Z"
              fill="#FFFDF9"
              stroke={INK}
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <path d="M161 66 L158 51 L170 62 Z" fill="#FFA6BA" />
            {/* Cuerno dorado espiral */}
            <path
              d="M180 66 L194 30 L204 70 Z"
              fill="#FFBE3D"
              stroke={INK}
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <path d="M185 52 L198 48 M183 61 L201 57" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
            {/* Mechón rosa y amarillo en frente */}
            <path
              d="M166 64 C180 54 198 64 194 82 C180 78 172 74 166 64 Z"
              fill="#F25C78"
              stroke={INK}
              strokeWidth="2.8"
              strokeLinejoin="round"
            />
          </g>
        ),
      },
      {
        id: 'head',
        name: 'Carita',
        cropBox: '142 58 116 96',
        pegPoint: { x: 198, y: 106 },
        zOrder: 3,
        render: () => (
          <g>
            {/* Cuello + cabeza suave */}
            <path
              d="M150 118 L152 146 L186 146 L186 124 C208 134 242 134 246 112 C248 92 222 72 192 68 C164 64 148 88 150 118 Z"
              fill="#FFFDF9"
              stroke={INK}
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
            {/* Hocico rosita */}
            <path
              d="M214 96 C234 94 246 102 246 112 C244 126 226 130 212 122 C208 112 208 102 214 96 Z"
              fill="#FFE0EB"
            />
            <StoryEyes lx={184} rx={206} y={96} r={5} lashes />
            <circle cx="232" cy="108" r="2.2" fill={INK} />
            <path d="M222 120 Q232 124 238 116" fill="none" stroke={INK} strokeWidth="2.6" strokeLinecap="round" />
            <ellipse cx="192" cy="110" rx="6.5" ry="4" fill="#FFA6BA" opacity="0.65" />
          </g>
        ),
      },
      {
        id: 'body',
        name: 'Cuerpito',
        cropBox: '78 132 132 104',
        pegPoint: { x: 144, y: 184 },
        zOrder: 2,
        render: () => (
          <g>
            <path
              d="M104 146 C86 156 84 200 104 218 C126 230 166 228 188 214 C204 202 204 160 186 140 L150 140 C138 148 120 144 104 146 Z"
              fill="#FFFDF9"
              stroke={INK}
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
            <path
              d={starPath(128, 178, 5, 13, 6)}
              fill="#FFBE3D"
              stroke={INK}
              strokeWidth="2.4"
              strokeLinejoin="round"
            />
          </g>
        ),
      },
      {
        id: 'legs',
        name: 'Patitas',
        cropBox: '84 204 124 84',
        pegPoint: { x: 138, y: 248 },
        zOrder: 1,
        render: () => (
          <g>
            {/* Patitas traseras y delanteras */}
            <rect x="96" y="208" width="22" height="64" rx="10" fill="#FFFDF9" stroke={INK} strokeWidth="3.2" />
            <path d="M96 254 L118 254 L118 264 C118 270 96 270 96 264 Z" fill="#5BC0EB" stroke={INK} strokeWidth="2.8" />
            <rect x="128" y="212" width="20" height="60" rx="9" fill="#F4ECFA" stroke={INK} strokeWidth="3.2" />
            <path d="M128 254 L148 254 L148 264 C148 270 128 270 128 264 Z" fill="#C8A2F6" stroke={INK} strokeWidth="2.8" />
            <rect x="168" y="208" width="22" height="64" rx="10" fill="#FFFDF9" stroke={INK} strokeWidth="3.2" />
            <path d="M168 254 L190 254 L190 264 C190 270 168 270 168 264 Z" fill="#5BC0EB" stroke={INK} strokeWidth="2.8" />
          </g>
        ),
      },
      {
        id: 'tail',
        name: 'Cola arcoíris',
        cropBox: '30 144 74 98',
        pegPoint: { x: 60, y: 192 },
        zOrder: 1,
        render: () => (
          <g>
            <path
              d="M94 162 C68 152 40 168 42 198 C44 216 58 228 76 226 C64 212 68 190 92 184 Z"
              fill="#F25C78"
              stroke={INK}
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
            <path
              d="M84 172 C62 174 52 190 56 212"
              fill="none"
              stroke="#FFBE3D"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M84 182 C70 186 64 198 68 214"
              fill="none"
              stroke="#5BC0EB"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </g>
        ),
      },
    ],
  },
];
