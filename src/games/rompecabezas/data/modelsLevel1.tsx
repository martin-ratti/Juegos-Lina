import type { PuzzleModel } from '../types';
import { INK, starPath } from '../utils/geometry';
import { PolkaBow, RosyCheeks, StoryEyes } from '../utils/shapes';

export const LEVEL_1_MODELS: PuzzleModel[] = [
  {
    id: 'perrito',
    name: 'El Perrito Toto',
    shortName: 'Perrito',
    level: 1,
    cardBg: 'bg-[#FFF0DC]',
    lipClass: 'shadow-[0_8px_0_#DF9E52]',
    boardDecor: 'meadow',
    pieces: [
      {
        id: 'ears',
        name: 'Orejitas',
        cropBox: '48 40 204 114',
        pegPoint: { x: 76, y: 102 },
        zOrder: 3,
        render: () => (
          <g>
            {/* Oreja izquierda caída */}
            <path
              d="M96 58 C66 56 54 96 64 128 C72 148 92 142 98 118 C102 100 102 74 96 58 Z"
              fill="#9B5D38"
              stroke={INK}
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
            <path
              d="M89 72 C74 74 68 98 73 120"
              fill="none"
              stroke="#B8774E"
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0.65"
            />
            {/* Oreja derecha caída */}
            <path
              d="M204 58 C234 56 246 96 236 128 C228 148 208 142 202 118 C198 100 198 74 204 58 Z"
              fill="#9B5D38"
              stroke={INK}
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
            <path
              d="M211 72 C226 74 232 98 227 120"
              fill="none"
              stroke="#B8774E"
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0.65"
            />
          </g>
        ),
      },
      {
        id: 'head',
        name: 'Carita',
        cropBox: '84 44 132 124',
        pegPoint: { x: 150, y: 106 },
        zOrder: 4,
        render: () => (
          <g>
            <ellipse
              cx="150"
              cy="108"
              rx="54"
              ry="50"
              fill="#F3B26C"
              stroke={INK}
              strokeWidth="3.2"
            />
            {/* Manchita crema sobre un ojo */}
            <ellipse cx="127" cy="98" rx="18" ry="20" fill="#FFF2DC" />
            {/* Hocico crema */}
            <ellipse
              cx="150"
              cy="127"
              rx="28"
              ry="20"
              fill="#FFF2DC"
              stroke={INK}
              strokeWidth="2.6"
            />
            <StoryEyes lx={127} rx={173} y={98} r={6.5} />
            <RosyCheeks lx={111} rx={189} y={114} rxSize={7.5} rySize={4.5} />
            {/* Nariz chocolate */}
            <ellipse cx="150" cy="119" rx="10" ry="7" fill={INK} />
            <ellipse cx="147" cy="117" rx="3" ry="1.8" fill="#FFFFFF" opacity="0.7" />
            {/* Sonrisa y lengüita */}
            <path
              d="M150 126 L150 133 M138 132 Q144 138 150 133 Q156 138 162 132"
              fill="none"
              stroke={INK}
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            <path
              d="M144 135 C144 146 156 146 156 135 Z"
              fill="#F25C78"
              stroke={INK}
              strokeWidth="2.4"
            />
          </g>
        ),
      },
      {
        id: 'body',
        name: 'Pancita',
        cropBox: '82 146 136 144',
        pegPoint: { x: 150, y: 214 },
        zOrder: 2,
        render: () => (
          <g>
            {/* Cuerpo sentado */}
            <path
              d="M110 156 C94 176 92 224 98 258 C100 272 116 276 150 276 C184 276 200 272 202 258 C208 224 206 176 190 156 Z"
              fill="#F3B26C"
              stroke={INK}
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
            {/* Pancita crema */}
            <ellipse cx="150" cy="216" rx="28" ry="38" fill="#FFF2DC" />
            {/* Collar rojo con chapita estrella */}
            <path
              d="M112 162 Q150 176 188 162 L185 174 Q150 187 115 174 Z"
              fill="#F25C78"
              stroke={INK}
              strokeWidth="2.8"
              strokeLinejoin="round"
            />
            <path
              d={starPath(150, 182, 5, 11, 5.5)}
              fill="#FFBE3D"
              stroke={INK}
              strokeWidth="2.4"
              strokeLinejoin="round"
            />
            {/* Patitas delanteras y traseras */}
            <ellipse cx="122" cy="264" rx="18" ry="13" fill="#FFF2DC" stroke={INK} strokeWidth="3" />
            <ellipse cx="178" cy="264" rx="18" ry="13" fill="#FFF2DC" stroke={INK} strokeWidth="3" />
            <path d="M116 266 L116 274 M126 266 L126 274 M174 266 L174 274 M184 266 L184 274" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
          </g>
        ),
      },
      {
        id: 'tail',
        name: 'Colita',
        cropBox: '188 188 86 84',
        pegPoint: { x: 232, y: 226 },
        zOrder: 1,
        render: () => (
          <g>
            <path
              d="M196 246 C224 246 254 226 254 202 C254 192 242 190 235 200 C226 214 212 224 196 226 Z"
              fill="#9B5D38"
              stroke={INK}
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
            <circle cx="245" cy="202" r="7" fill="#FFF2DC" />
          </g>
        ),
      },
    ],
  },
  {
    id: 'gatita',
    name: 'La Gatita Misi',
    shortName: 'Gatita',
    level: 1,
    cardBg: 'bg-[#F3EAFF]',
    lipClass: 'shadow-[0_8px_0_#A67CE0]',
    boardDecor: 'sunny',
    pieces: [
      {
        id: 'ears',
        name: 'Orejitas',
        cropBox: '80 28 140 82',
        pegPoint: { x: 108, y: 55 },
        zOrder: 3,
        render: () => (
          <g>
            {/* Oreja izquierda */}
            <path
              d="M92 86 L96 40 C97 34 105 33 110 38 L136 66 Z"
              fill="#D9C2F7"
              stroke={INK}
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
            <path d="M100 76 L102 48 L124 68 Z" fill="#FFA6BA" />
            {/* Oreja derecha */}
            <path
              d="M208 86 L204 40 C203 34 195 33 190 38 L164 66 Z"
              fill="#D9C2F7"
              stroke={INK}
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
            <path d="M200 76 L198 48 L176 68 Z" fill="#FFA6BA" />
            {/* Moñito frutilla */}
            <PolkaBow cx={188} cy={52} scale={0.95} rotate={18} />
          </g>
        ),
      },
      {
        id: 'head',
        name: 'Carita',
        cropBox: '78 52 144 114',
        pegPoint: { x: 150, y: 108 },
        zOrder: 4,
        render: () => (
          <g>
            <ellipse
              cx="150"
              cy="110"
              rx="54"
              ry="46"
              fill="#E7D8FC"
              stroke={INK}
              strokeWidth="3.2"
            />
            {/* Rayitas suaves en la frente */}
            <path
              d="M142 66 L142 78 M150 64 L150 80 M158 66 L158 78"
              stroke="#B28CE6"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <StoryEyes lx={127} rx={173} y={104} r={6.5} lashes />
            <RosyCheeks lx={112} rx={188} y={118} rxSize={8} rySize={4.5} />
            {/* Nariz triangular rosita */}
            <path
              d="M144 114 L156 114 L150 122 Z"
              fill="#F25C78"
              stroke={INK}
              strokeWidth="2.4"
              strokeLinejoin="round"
            />
            {/* Boquita "w" */}
            <path
              d="M150 122 L150 126 M139 127 Q144.5 133 150 127 Q155.5 133 161 127"
              fill="none"
              stroke={INK}
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            {/* Bigotes */}
            <g stroke={INK} strokeWidth="2.4" strokeLinecap="round">
              <path d="M104 110 L86 106 M104 118 L86 121" />
              <path d="M196 110 L214 106 M196 118 L214 121" />
            </g>
          </g>
        ),
      },
      {
        id: 'body',
        name: 'Cuerpito',
        cropBox: '90 144 120 142',
        pegPoint: { x: 150, y: 214 },
        zOrder: 2,
        render: () => (
          <g>
            <path
              d="M114 154 C100 176 98 222 104 258 C107 272 122 276 150 276 C178 276 193 272 196 258 C202 222 200 176 186 154 Z"
              fill="#E7D8FC"
              stroke={INK}
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
            {/* Pechito blanco con corazoncito */}
            <ellipse cx="150" cy="212" rx="28" ry="38" fill="#FFFDF9" />
            <path
              d="M150 202 C146 194 134 195 134 204 C134 214 150 223 150 223 C150 223 166 214 166 204 C166 195 154 194 150 202 Z"
              fill="#F25C78"
              stroke={INK}
              strokeWidth="2.4"
              strokeLinejoin="round"
            />
            {/* Patitas */}
            <ellipse cx="124" cy="264" rx="17" ry="12" fill="#FFFDF9" stroke={INK} strokeWidth="3" />
            <ellipse cx="176" cy="264" rx="17" ry="12" fill="#FFFDF9" stroke={INK} strokeWidth="3" />
          </g>
        ),
      },
      {
        id: 'tail',
        name: 'Colita',
        cropBox: '184 166 96 106',
        pegPoint: { x: 236, y: 212 },
        zOrder: 1,
        render: () => (
          <g>
            <path
              d="M192 252 C226 254 252 240 258 216 C264 190 242 176 232 184 C224 190 232 202 238 206 C240 220 220 234 192 232 Z"
              fill="#D9C2F7"
              stroke={INK}
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
            <circle cx="238" cy="190" r="8" fill="#FFFDF9" stroke={INK} strokeWidth="2.6" />
          </g>
        ),
      },
    ],
  },
];
