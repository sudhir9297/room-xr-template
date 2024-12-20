export const productVariation = [
  {
    id: 1,
    sku: "HEEL-RED-X008",
    name: "Crimson Flame Stiletto",
    subDesc:
      "A sleek red Stiletto pump with a high heel, perfect for adding bold elegance to any outfit.",
    totalReview: 42,
    rating: 4,
    price: 7360,
    thumbnail: "/thumb/red/1-1.webp",
    type: "red",
    variation: [
      "/thumb/red/1-1.webp",
      "/thumb/red/1-2.webp",
      "/thumb/red/1-3.webp",
      "/thumb/red/1-4.webp",
    ],

    meshNameList: {
      sole: {
        color: "#111111",
        metalness: 0.0001,
        roughness: 0.918182,
      },
      inner_side: { color: "#E7E7E7", metalness: 0.0001, roughness: 0.822727 },
      inner_base: { color: "#E7B39C", metalness: 0.0001, roughness: 0.790909 },
      body: { color: "#C90023", metalness: 0.1, roughness: 0.07273 },
    },
  },
  {
    id: 2,
    sku: "HEEL-BLACK-X008",
    name: "Obsidian Luxe Stiletto",
    subDesc:
      "A chic brown Stiletto pump with a slender heel, offering understated sophistication and versatile style.",
    totalReview: 22,
    rating: 3,
    price: 9020,
    thumbnail: "/thumb/black/2-1.webp",
    type: "black",
    variation: [
      "/thumb/black/2-1.webp",
      "/thumb/black/2-2.webp",
      "/thumb/black/2-3.webp",
      "/thumb/black/2-4.webp",
    ],
    meshNameList: {
      sole: {
        color: "#E8DDCD",
        metalness: 0.0001,
        roughness: 0.918182,
      },
      inner_side: { color: "#C1A995", metalness: 0.0001, roughness: 0.822727 },
      inner_base: { color: "#DFBFB0", metalness: 0.0001, roughness: 0.890909 },
      body: { color: "#22241E", metalness: 0.1, roughness: 0.07273 },
    },
  },
  {
    id: 3,
    sku: "HEEL-YELLOW-X008",
    name: "Yellow Glimmer Stiletto",
    subDesc:
      "A glamorous gold Stiletto pump with a high, shimmering heel that instantly elevates your look with luxe flair.",
    totalReview: 12,
    rating: 4,
    price: 8118,
    thumbnail: "/thumb/yellow/3-1.webp",
    type: "yellow",
    variation: [
      "/thumb/yellow/3-1.webp",
      "/thumb/yellow/3-2.webp",
      "/thumb/yellow/3-3.webp",
      "/thumb/yellow/3-4.webp",
    ],
    meshNameList: {
      sole: {
        color: "#111111",
        metalness: 0.0001,
        roughness: 0.918182,
      },
      inner_side: { color: "#E7E7E7", metalness: 0.0001, roughness: 0.822727 },
      inner_base: { color: "#E7B39C", metalness: 0.0001, roughness: 0.790909 },
      body: { color: "#FECD33", metalness: 0.1, roughness: 0.07273 },
    },
  },
];

export const ProductList = {
  vitraEames: {
    id: 1,
    glbLink: "./models/vitra_eames_chair.glb",
    name: "Vitra Eames",
    desc: "Stylish and Comfortable icon of modern design, made with high-quality materials.",
    thumbnail: "./texture/productThumbnail/vitra_eames.png",
    variation: [
      {
        id: "1001",
        thumbnail: "./texture/fabric1.jpg",
        varDesc:
          "A symphony of hues, the colorful chair dances in a kaleidoscope of dreams. Each vibrant shade whispers tales of joy and creativity, inviting you to sit and bask in its rainbow embrace",
        price: 7999,
        varData: {
          legs_vitraEames: {
            color: "#ffffff",
            map: "./texture/wood1.jpg",
            metalness: 0.00001,
            roughness: 0.672727,
            repeatX: 1,
            repeatY: 1,
          },
          metals_vitraEames: {
            color: "#090909",
            metalness: 0.595455,
            roughness: 0.331818,
          },
          seat_vitraEames: {
            color: "#ffffff",
            map: "./texture/fabric1.jpg",
            metalness: 0.00001,
            roughness: 0.825,
            repeatX: 1,
            repeatY: 1,
          },
        },
      },
      {
        id: "1002",
        thumbnail: "./texture/fabric7.jpg",
        varDesc:
          "Draped in the whisper of elegance, the linen fabric chair speaks the language of nature and serenity. Its soft, earthy texture cradles you in a gentle embrace, weaving tales of timeless beauty and tranquil afternoons.",
        price: 5499,
        varData: {
          legs_vitraEames: {
            color: "#ffffff",
            map: "./texture/wood2.jpg",
            metalness: 0.00001,
            roughness: 0.672727,
            repeatX: 1,
            repeatY: 1,
          },
          metals_vitraEames: {
            color: "#090909",
            metalness: 0.595455,
            roughness: 0.331818,
          },
          seat_vitraEames: {
            color: "#ffffff",
            map: "./texture/fabric7.jpg",
            metalness: 0.00001,
            roughness: 0.825,
            repeatX: 1,
            repeatY: 1,
          },
        },
      },
      {
        id: "1003",
        thumbnail: "./texture/fabric3.jpg",
        varDesc:
          "Wrapped in the rich embrace of luxury, the leather chair exudes timeless sophistication and strength. Its supple surface tells stories of grandeur and durability, inviting you to sink into its warm, inviting hold.",
        price: 6399,
        varData: {
          legs_vitraEames: {
            color: "#fffeef",
            map: "./texture/fabric3.jpg",
            metalness: 0.00001,
            roughness: 0.672727,
            repeatX: 1,
            repeatY: 1,
          },
          metals_vitraEames: {
            color: "#090909",
            metalness: 0.595455,
            roughness: 0.331818,
          },
          seat_vitraEames: {
            color: "#ffffff",
            map: "./texture/fabric3.jpg",
            metalness: 0.00001,
            roughness: 0.4,
            repeatX: 1,
            repeatY: 1,
          },
        },
      },
    ],
  },
  swing_chair: {
    id: 2,
    glbLink: "./models/swing_chair.glb",
    name: "Swing Chair",
    desc: "Suspended between earth and sky,A cradle of dreams in the soft embrace of days gentle haze.",
    thumbnail: "./texture/productThumbnail/swing_chair.png",
    variation: [
      {
        id: "2001",
        thumbnail: "./texture/fabric18.jpg",
        varDesc:
          "Gently swaying in a dance with the breeze, the swing chair cradles dreams in its embrace. Draped with a green pillow adorned with playful sheep, it invites whispers of pastoral tranquility and childhood wonder.",
        price: 9599,
        varData: {
          wood: {
            color: "#ffffff",
            map: "./texture/wood3.jpg",
            metalness: 0.00001,
            roughness: 0.672727,
            repeatX: 1,
            repeatY: 1,
          },
          metal: {
            color: "#090909",
            metalness: 0.595455,
            roughness: 0.331818,
          },
          cushion: {
            color: "#ffffff",
            map: "./texture/fabric18.jpg",
            metalness: 0.00001,
            roughness: 0.825,
            repeatX: 1,
            repeatY: 1,
          },
        },
      },
      {
        id: "2002",
        thumbnail: "./texture/fabric22.png",
        varDesc:
          "Resting like a sunbeam, the yellow pillow adorned with a playful pineapple brightens any space with a burst of tropical joy. Its vibrant hue and cheerful design whisper of sun-soaked days and carefree moments. ",
        price: 8299,
        varData: {
          wood: {
            color: "#ffffff",
            map: "./texture/wood1.jpg",
            metalness: 0.00001,
            roughness: 0.672727,
            repeatX: 1,
            repeatY: 1,
          },
          metal_MODERN: {
            color: "#FFDBA1",
            metalness: 0.895455,
            roughness: 0.231818,
          },
          cushion: {
            color: "#ffffff",
            map: "./texture/fabric22.png",
            metalness: 0.00001,
            roughness: 0.825,
            repeatX: 1,
            repeatY: 1,
          },
        },
      },
      {
        id: "2003",
        thumbnail: "./texture/fabric19.jpg",
        varDesc:
          "Rich and inviting, the red pillow adorned with a graceful wine motif tells tales of warmth and celebration. Its deep hue evokes the essence of a fine vintage, promising moments of relaxation and indulgence.",
        price: 7899,
        varData: {
          wood: {
            color: "#fffeef",
            map: "./texture/wood5.jpg",
            metalness: 0.00001,
            roughness: 0.672727,
            repeatX: 1,
            repeatY: 1,
          },
          metal_ring: {
            color: "#E2E0E0",
            metalness: 0.895455,
            roughness: 0.131818,
          },
          cushion: {
            color: "#ffffff",
            map: "./texture/fabric19.jpg",
            metalness: 0.00001,
            roughness: 0.4,
            repeatX: 1,
            repeatY: 1,
          },
        },
      },
      {
        id: "2004",
        thumbnail: "./texture/fabric13.jpg",
        varDesc:
          "Nestled in verdant tranquility, the green pillow adorned with a stitch print weaves a tale of artisanal charm and natural beauty. Each delicate thread traces a path of handmade artistry, inviting gentle fingertips to explore its textured embrace.",
        price: 8349,
        varData: {
          wood: {
            color: "#fffeef",
            map: "./texture/wood3.jpg",
            metalness: 0.00001,
            roughness: 0.672727,
            repeatX: 1,
            repeatY: 1,
          },
          metal_ring: {
            color: "#090909",
            metalness: 0.895455,
            roughness: 0.131818,
          },
          cushion: {
            color: "#ffffff",
            map: "./texture/fabric13.jpg",
            metalness: 0.00001,
            roughness: 0.4,
            repeatX: 1,
            repeatY: 1,
          },
        },
      },
    ],
  },
  hangingChair: {
    id: 3,
    glbLink: "./models/hanging_chair.glb",
    name: "Hanging Chair",
    desc: "In a garden where whispers of breeze abide,There stands a chair, a haven, by natures side.",
    thumbnail: "./texture/productThumbnail/hanging_chair.png",
    variation: [
      {
        id: "3001",
        thumbnail: "./texture/fabric20.jpg",
        varDesc:
          "Suspended in tranquility, our hanging chair envelops you in comfort, a peaceful retreat where serenity meets style.",
        price: 6399,
        varData: {
          wood_hangingChair: {
            color: "#ffffff",
            map: "./texture/wood5.jpg",
            metalness: 0.00001,
            roughness: 0.672727,
            repeatX: 1,
            repeatY: 1,
          },
          metal_hangingChair: {
            color: "#292929",
            metalness: 0.0001,
            roughness: 0.129,
          },
          chain_hangingChair: {
            color: "#ffffff",
            metalness: 1.0,
            roughness: 0.0001,
          },
          cushion_hangingChair: {
            color: "#ffffff",
            map: "./texture/fabric20.jpg",
            metalness: 0.00001,
            roughness: 0.825,
            repeatX: 1,
            repeatY: 1,
          },
        },
      },
      {
        id: "3002",
        thumbnail: "./texture/fabric22.png",
        varDesc:
          "Amidst the gentle sway, a hanging chair adorned with a yellow cushion invites serenity, blending comfort with sunshines embrace.",
        price: 8799,
        varData: {
          wood_hangingChair: {
            color: "#ffffff",
            map: "./texture/wood1.jpg",
            metalness: 0.00001,
            roughness: 0.672727,
            repeatX: 1,
            repeatY: 1,
          },
          metal_hangingChair: {
            color: "#FFDBA1",
            metalness: 1.0,
            roughness: 0.0001,
          },
          chain_hangingChair: {
            color: "#090909",
            metalness: 0.595455,
            roughness: 0.331818,
          },
          cushion_hangingChair: {
            color: "#ffffff",
            map: "./texture/fabric22.png",
            metalness: 0.00001,
            roughness: 0.825,
            repeatX: 1,
            repeatY: 1,
          },
        },
      },
      {
        id: "3003",
        thumbnail: "./texture/fabric19.jpg",
        varDesc:
          "Amidst the gentle sway, a hanging chair with a red cushion, adorned with sketches of wine, invites you to unwind, blending elegance with the allure of leisure.",
        price: 8799,
        varData: {
          wood_hangingChair: {
            color: "#fffeef",
            map: "./texture/wood3.jpg",
            metalness: 0.00001,
            roughness: 0.672727,
            repeatX: 1,
            repeatY: 1,
          },
          metal_hangingChair: {
            color: "#E2E0E0",
            metalness: 1.0,
            roughness: 0.1,
          },
          chain_hangingChair: {
            color: "#090909",
            metalness: 0.595455,
            roughness: 0.331818,
          },
          cushion_hangingChair: {
            color: "#ffffff",
            map: "./texture/fabric19.jpg",
            metalness: 0.00001,
            roughness: 0.4,
            repeatX: 1,
            repeatY: 1,
          },
        },
      },
      {
        id: "3004",
        thumbnail: "./texture/fabric13.jpg",
        varDesc:
          "Beneath the swaying boughs, a hanging chair with a green cushion, stitched with care, beckons tranquility, where craftsmanship meets natures gentle embrace.",
        price: 8299,
        varData: {
          wood_hangingChair: {
            color: "#fffeef",
            map: "./texture/wood2.jpg",
            metalness: 0.00001,
            roughness: 0.672727,
            repeatX: 1,
            repeatY: 1,
          },
          metal_hangingChair: {
            color: "#090909",
            metalness: 1.0,
            roughness: 0.0001,
          },
          chain_hangingChair: {
            color: "#D5DBE3",
            metalness: 1.0,
            roughness: 0.0001,
          },
          cushion_hangingChair: {
            color: "#ffffff",
            map: "./texture/fabric13.jpg",
            metalness: 0.00001,
            roughness: 0.4,
            repeatX: 1,
            repeatY: 1,
          },
        },
      },
    ],
  },
  ringChair: {
    id: 4,
    glbLink: "./models/ring_chair.glb",
    name: "Ring Chair",
    desc: "A ring chair, where elegance arcs in serene circles, inviting moments of peaceful reflection.",
    thumbnail: "./texture/productThumbnail/ring_chair.png",
    variation: [
      {
        id: "4001",
        thumbnail: "./texture/fabric10.jpg",
        varDesc:
          "A circular chair, draped in bold red fabric with flowing lines, embodies a seamless blend of vibrant allure and graceful design.",
        price: 4999,
        varData: {
          legs_ringChair: {
            color: "#AEAEAE",
            metalness: 1.0,
            roughness: 0.6,
          },
          seat_ringChair: {
            color: "#ffffff",
            map: "./texture/fabric10.jpg",
            metalness: 0.00001,
            roughness: 0.825,
            repeatX: 1,
            repeatY: 1,
          },
        },
      },
      {
        id: "4002",
        thumbnail: "./texture/fabric22.png",
        varDesc:
          "A circular chair adorned in sunny yellow fabric, embellished with playful pineapple drawings, radiates whimsical charm and joyful sophistication.",
        price: 6899,
        varData: {
          legs_ringChair: {
            color: "#ffffff",
            map: "./texture/wood2.jpg",
            metalness: 0.00001,
            roughness: 0.672727,
            repeatX: 1,
            repeatY: 1,
          },

          seat_ringChair: {
            color: "#ffffff",
            map: "./texture/fabric22.png",
            metalness: 0.00001,
            roughness: 0.825,
            repeatX: 1,
            repeatY: 1,
          },
        },
      },
      {
        id: "4003",
        thumbnail: "./texture/fabric19.jpg",
        varDesc:
          "In the embrace of crimson hues, a circular chair adorned,With wine drawn delicately, its tales of vineyards formed.",
        price: 8799,
        varData: {
          legs_ringChair: {
            color: "#fffeef",
            map: "./texture/wood3.jpg",
            metalness: 0.00001,
            roughness: 0.672727,
            repeatX: 1,
            repeatY: 1,
          },

          seat_ringChair: {
            color: "#ffffff",
            map: "./texture/fabric19.jpg",
            metalness: 0.00001,
            roughness: 0.4,
            repeatX: 1,
            repeatY: 1,
          },
        },
      },
      {
        id: "4004",
        thumbnail: "./texture/fabric13.jpg",
        varDesc:
          "A circular chair, cloaked in verdant green,Stitched patterns whisper tales unseen.",
        price: 5899,
        varData: {
          legs_ringChair: {
            color: "#fffeef",
            map: "./texture/wood2.jpg",
            metalness: 0.00001,
            roughness: 0.672727,
            repeatX: 1,
            repeatY: 1,
          },

          seat_ringChair: {
            color: "#ffffff",
            map: "./texture/fabric13.jpg",
            metalness: 0.00001,
            roughness: 0.4,
            repeatX: 1,
            repeatY: 1,
          },
        },
      },
    ],
  },
  modern_chair: {
    id: 5,
    glbLink: "./models/modern_chair.glb",
    name: "Modern Chair",
    desc: "Sleek modernity in every curve and line, a chair designed to redefine your space and time.",
    thumbnail: "./texture/productThumbnail/modern_chair.png",
    variation: [
      {
        id: "5001",
        thumbnail: "./texture/fabric22.png",
        varDesc:
          "A modern chair in yellow fabric, sunlight woven into sleek design sublime.",
        price: 3499,
        varData: {
          Plastic: {
            color: "#191919",
            metalness: 1.0,
            roughness: 0.6,
          },
          Fabric: {
            color: "#ffffff",
            map: "./texture/fabric22.png",
            metalness: 0.00001,
            roughness: 0.825,
            repeatX: 8,
            repeatY: 8,
          },
          Wood: {
            color: "#ffffff",
            map: "./texture/wood1.jpg",
            metalness: 0.00001,
            roughness: 0.825,
            repeatX: 1,
            repeatY: 1,
          },
        },
      },
      {
        id: "5002",
        thumbnail: "./texture/fabric8.jpg",
        varDesc:
          "A modern chair in linen fabric, where softness meets minimalist allure divine.",
        price: 4399,
        varData: {
          Plastic: {
            color: "#191919",
            metalness: 1.0,
            roughness: 0.6,
          },
          Fabric: {
            color: "#ffffff",
            map: "./texture/fabric8.jpg",
            metalness: 0.00001,
            roughness: 0.825,
            repeatX: 8,
            repeatY: 8,
          },
          Wood: {
            color: "#ffffff",
            map: "./texture/wood2.jpg",
            metalness: 0.00001,
            roughness: 0.825,
            repeatX: 1,
            repeatY: 1,
          },
        },
      },
      {
        id: "5003",
        thumbnail: "./texture/fabric14.jpg",
        varDesc:
          "A modern chair in checkered fabric, where pattern and style harmonize in timeless flair.",
        price: 4899,
        varData: {
          Plastic: {
            color: "#643500",
            metalness: 0.001,
            roughness: 0.6,
          },
          Fabric: {
            color: "#ffffff",
            map: "./texture/fabric14.jpg",
            metalness: 0.00001,
            roughness: 0.825,
            repeatX: 8,
            repeatY: 8,
          },
          Wood: {
            color: "#ffffff",
            map: "./texture/wood3.jpg",
            metalness: 0.00001,
            roughness: 0.825,
            repeatX: 1,
            repeatY: 1,
          },
        },
      },
    ],
  },
  roundTable: {
    id: 8,
    name: "Round Table",
    glbLink: "./models/round_table.glb",
    desc: "A wooden round table, where craftsmanship circles in timeless unity. Embodies passion and sophistication in every curve.",
    thumbnail: "./texture/productThumbnail/round_table.png",
    variation: [
      {
        id: "8001",
        thumbnail: "./texture/wood1.jpg",
        varDesc:
          "A dark wood round table, where elegance and earthiness meld in harmonious unity.",
        price: 7999,
        varData: {
          table_roundTable: {
            color: "#ffffff",
            map: "./texture/wood1.jpg",
            metalness: 0.055,
            roughness: 0.354545,
            repeatX: 1,
            repeatY: 1,
          },
        },
      },
      {
        id: "8002",
        thumbnail: "./texture/wood5.jpg",
        varDesc:
          "In the heart of gatherings, a round table stands bold,Dark wood whispers tales of ages untold.",
        price: 6899,
        varData: {
          table_roundTable: {
            color: "#ffffff",
            map: "./texture/wood5.jpg",
            metalness: 0.0001,
            roughness: 0.1,
            repeatX: 1,
            repeatY: 1,
          },
        },
      },
      {
        id: "8003",
        thumbnail: "./texture/wood3.jpg",
        varDesc:
          "In the circle of warmth, a table of yellow wood gleams,Sunlight captured in grain, weaving dreams.",
        price: 5699,
        varData: {
          table_roundTable: {
            color: "#ffffff",
            map: "./texture/wood3.jpg",
            metalness: 0.055,
            roughness: 0.354545,
            repeatX: 1,
            repeatY: 1,
          },
        },
      },
    ],
  },
};
