import type { Room } from "./types";
import { opt } from "./types";

export const C2: Room[] = [
  {
    id: "c2-tinta",
    level: "C2",
    place: "El umbral de tinta",
    placeGloss: "The ink threshold",
    word: "vislumbrar",
    pos: "verbo",
    gloss: "to glimpse",
    example: "Apenas vislumbro su silueta entre los anaqueles.",
    exampleGloss: "I can barely glimpse his silhouette among the shelves.",
    grammar:
      "Vislumbrar is to make something out faintly, not to hold it, and not to see it in full light. It fails if the object is grasped or forgotten entirely.",
    scene:
      "La escalera termina en un umbral sin puerta. Más allá, anaqueles. La luz no llega al fondo. Algo —alguien— se mueve, y no llega a ser una figura.",
    sceneGloss:
      "The stair ends at a threshold with no door. Beyond, shelves. The light does not reach the back. Something — someone — moves, and does not quite become a figure.",
    scrap: "Apenas te vislumbro. Si lees esto, estás cerca, y todavía no estás. —M",
    scrapGloss: "I can barely glimpse you. If you are reading this, you are close, and you are not here yet. —M",
    actions: [
      {
        id: "anaqueles",
        label: "Avanzar un paso",
        labelGloss: "Take one step",
        text: "El paso no aclara nada. Solo confirma que hay profundidad, y una forma que se niega.",
        textGloss: "The step clarifies nothing. It only confirms that there is depth, and a shape that refuses.",
      },
      {
        id: "decir",
        label: "Decir lo que ves",
        labelGloss: "Say what you see",
        trial: {
          prompt: "¿Qué frase usa «vislumbrar» con su sentido justo?",
          promptGloss: "Which sentence uses “vislumbrar” in its exact sense?",
          hint: "Ver poco, de lejos o entre sombras. No tocar.",
          hintGloss: "To see little, from far away or among shadows. Not to touch.",
          options: [
            opt(
              "Lo vislumbro porque lo tengo entre las manos, a plena luz.",
              "Plena luz y las manos anulan el verbo. Eso es tener, no vislumbrar.",
              "Full light and your hands cancel the verb. That is holding, not glimpsing.",
            ),
            opt(
              "Apenas vislumbro una silueta entre los anaqueles.",
              "La forma no se acerca. La frase sí acierta.",
              "The shape does not come closer. The sentence does land.",
              true,
            ),
            opt(
              "Vislumbrar aquí significa olvidar del todo.",
              "Olvidar es el extremo contrario.",
              "Forgetting is the opposite extreme.",
            ),
            opt(
              "Vislumbro, es decir, grito su nombre hasta que aparece.",
              "El grito no es una visión débil.",
              "A shout is not a weak seeing.",
            ),
          ],
        },
      },
    ],
    exits: [{ dir: "adentro", to: "c2-scriptorium", label: "el scriptorium", labelGloss: "the scriptorium" }],
    recall: {
      prompt: "Desde la azotea, de noche, una ventana lejana se enciende un segundo. No distingues la cara.",
      promptGloss: "From the rooftop, at night, a distant window lights for a second. You cannot make out the face.",
      hint: "Ver fugaz y sin detalle.",
      hintGloss: "A fleeting sight without detail.",
      options: [
        opt(
          "Vislumbro una luz y ninguna cara.",
          "Eso es el borde de ver.",
          "That is the edge of seeing.",
          true,
        ),
        opt(
          "Vislumbro su cara con todo detalle.",
          "El detalle pleno ya no es vislumbrar.",
          "Full detail is no longer glimpsing.",
        ),
        opt(
          "Vislumbrar la luz significa apagarla.",
          "El verbo no apaga nada.",
          "The verb does not switch anything off.",
        ),
        opt(
          "Lo vislumbro al abrazarlo en el umbral.",
          "El abrazo es contacto, no atisbo.",
          "An embrace is contact, not a glimpse.",
        ),
      ],
    },
  },
  {
    id: "c2-scriptorium",
    level: "C2",
    place: "El scriptorium",
    placeGloss: "The scriptorium",
    word: "hubiera",
    pos: "pluscuamperfecto de subjuntivo",
    gloss: "had (hypothetical past)",
    example: "Si hubiera leído la nota, no se habría perdido.",
    exampleGloss: "If he had read the note, he would not have gotten lost.",
    grammar:
      "A counterfactual past is si + pluscuamperfecto de subjuntivo, then the conditional perfect: si hubiera leído, no se habría perdido. Si habría leído puts the conditional on the wrong side of si.",
    scene:
      "Mesas de copista, tinteros secos, una nota que ya leíste en el patio y que aquí aparece sin abrir. El pasado de Mateo cabe en una condición que no ocurrió.",
    sceneGloss:
      "Copyists' tables, dry inkwells, a note you already read in the patio and that here appears unopened. Mateo's past fits inside a condition that did not happen.",
    scrap: "Si hubiera esperado, te habría encontrado en el patio. No esperé. El perdón, si cabe, va en pluscuamperfecto. —M",
    scrapGloss: "If I had waited, I would have found you in the patio. I did not wait. Forgiveness, if it fits, goes in the pluperfect. —M",
    actions: [
      {
        id: "nota",
        label: "Dejar la nota cerrada",
        labelGloss: "Leave the note closed",
        text: "Ya sabes lo que dice. Abrirla otra vez no cambia el hecho: él no te esperó.",
        textGloss: "You already know what it says. Opening it again does not change the fact: he did not wait for you.",
      },
      {
        id: "condicional",
        label: "Decir el pasado que no fue",
        labelGloss: "Say the past that was not",
        trial: {
          prompt: "La condición es falsa: no leyó a tiempo. ¿Qué frase lo formula?",
          promptGloss: "The condition is false: he did not read in time. Which sentence formulates it?",
          hint: "Si hubiera + participio, habría + participio.",
          hintGloss: "Si hubiera + participle, habría + participle.",
          options: [
            opt(
              "Si habría leído la nota, no se hubiera perdido.",
              "Habría no va en la prótasis. Después de si, hubiera.",
              "Habría does not go in the if-clause. After si, hubiera.",
            ),
            opt(
              "Si hubiera leído la nota, no se perderá ayer.",
              "El futuro no repara un ayer hipotético.",
              "The future does not repair a hypothetical yesterday.",
            ),
            opt(
              "Si hubiera leído la nota, no se habría perdido.",
              "La mesa de copista no se mueve. La gramática, sí.",
              "The copyist's table does not move. The grammar does.",
              true,
            ),
            opt(
              "Si hubiera leer la nota, no se ha perdido.",
              "Leer no es participio, y el presente perfecto no cierra la hipótesis.",
              "Leer is not a participle, and the present perfect does not close the hypothesis.",
            ),
          ],
        },
      },
    ],
    exits: [
      { dir: "afuera", to: "c2-tinta", label: "el umbral de tinta", labelGloss: "the ink threshold" },
      { dir: "norte", to: "c2-galeria", label: "la galería", labelGloss: "the gallery" },
    ],
    recall: {
      prompt: "Otra condición falsa, ahora sobre ti: no subiste a la azotea a tiempo, y por eso no viste la luz.",
      promptGloss: "Another false condition, now about you: you did not go up to the roof in time, and so you did not see the light.",
      hint: "Si hubiera subido, habría visto.",
      hintGloss: "Si hubiera subido, habría visto.",
      options: [
        opt(
          "Si hubiera subido, habría visto la luz.",
          "Las dos mitades están en su tiempo.",
          "Both halves are in their tense.",
          true,
        ),
        opt(
          "Si habría subido, hubiera ver la luz.",
          "El condicional está del lado equivocado, y ver no es participio.",
          "The conditional is on the wrong side, and ver is not a participle.",
        ),
        opt(
          "Si subí, veré la luz ayer.",
          "Eso afirma un pasado real y un futuro imposible.",
          "That states a real past and an impossible future.",
        ),
        opt(
          "Si hubiera subido, veo la luz.",
          "Veo devuelve la consecuencia al presente.",
          "Veo drags the result back to the present.",
        ),
      ],
    },
  },
  {
    id: "c2-galeria",
    level: "C2",
    place: "La galería",
    placeGloss: "The gallery",
    word: "abalanzarse",
    pos: "verbo pronominal",
    gloss: "to lunge",
    example: "La figura se abalanza sobre la puerta.",
    exampleGloss: "The figure lunges at the door.",
    grammar:
      "Abalanzarse takes se and usually sobre: a sudden lunge toward something. Without se it is not this verb. It is not a slow retreat.",
    scene:
      "Una galería estrecha. En el muro, una figura pintada se lanza hacia una puerta hecha de letras. El gesto no es un paso. Es un hambre de llegar.",
    sceneGloss:
      "A narrow gallery. On the wall, a painted figure throws itself toward a door made of letters. The gesture is not a step. It is a hunger to arrive.",
    scrap: "No te abalances sobre la última palabra. Las precisas no se cazan a gritos. —M",
    scrapGloss: "Do not lunge at the last word. Precise ones are not hunted by shouting. —M",
    actions: [
      {
        id: "muro",
        label: "Seguir el gesto pintado",
        labelGloss: "Follow the painted gesture",
        text: "La mano de la figura no toca la puerta. Se queda a un palmo, y ese palmo es todo el cuadro.",
        textGloss: "The figure's hand does not touch the door. It stops a hand's breadth away, and that breadth is the whole painting.",
      },
      {
        id: "verbo",
        label: "Nombrar el gesto",
        labelGloss: "Name the gesture",
        trial: {
          prompt: "¿Qué frase nombra ese lanzarse brusco?",
          promptGloss: "Which sentence names that sudden throwing of oneself?",
          hint: "Se abalanza sobre algo. Con pronombre y con dirección.",
          hintGloss: "Se abalanza sobre something. With the pronoun and a direction.",
          options: [
            opt(
              "La figura se abalanza, es decir, retrocede despacio.",
              "Retroceder despacio es el gesto contrario.",
              "Retreating slowly is the opposite gesture.",
            ),
            opt(
              "La figura abalanza la puerta sin pronombre.",
              "Sin se, y sin sobre, el verbo no hace este sentido.",
              "Without se, and without sobre, the verb does not mean this.",
            ),
            opt(
              "La figura se abalanza sobre la puerta de letras.",
              "El cuadro parece oírte. No se mueve.",
              "The painting seems to hear you. It does not move.",
              true,
            ),
            opt(
              "Se abalanzan la calma y el quedarse quieto.",
              "La calma no se abalanza. El sujeto y el sentido fallan.",
              "Calm does not lunge. The subject and the sense both fail.",
            ),
          ],
        },
      },
    ],
    exits: [
      { dir: "sur", to: "c2-scriptorium", label: "el scriptorium", labelGloss: "the scriptorium" },
      { dir: "adentro", to: "c2-ultima", label: "la última sala", labelGloss: "the last room" },
    ],
    recall: {
      prompt: "En el puente, alguien corre de golpe hacia Rosa, no para huir. ¿Cómo lo cuentas?",
      promptGloss: "On the bridge, someone suddenly runs toward Rosa, not to flee. How do you tell it?",
      hint: "Se abalanzó sobre ella.",
      hintGloss: "Se abalanzó sobre her.",
      options: [
        opt(
          "Se abalanzó sobre Rosa.",
          "Pronombre, pretérito y sobre: el gesto completo.",
          "Pronoun, pretérito, and sobre: the whole gesture.",
          true,
        ),
        opt("Abalanzó Rosa hacia atrás.", "Ni el pronombre ni la dirección cuadran.", "Neither the pronoun nor the direction fits."),
        opt("Se abalanzó, es decir, se sentó con calma.", "Sentarse no es abalanzarse.", "Sitting down is not lunging."),
        opt("Rosa se abalanzó de no moverse.", "«De no moverse» apaga el verbo.", "“De no moverse” switches the verb off."),
      ],
    },
  },
  {
    id: "c2-ultima",
    level: "C2",
    place: "La última sala",
    placeGloss: "The last room",
    word: "inefable",
    pos: "adjetivo",
    gloss: "ineffable",
    example: "Lo que la ciudad guardaba era casi inefable.",
    exampleGloss: "What the city was keeping was almost ineffable.",
    grammar:
      "Inefable names what does not fit into words, not what is noisy, obvious, or already printed on a sign. Saying the whole thing in one crude word contradicts it.",
    scene:
      "La sala no tiene estanterías. Tiene el silencio que las otras puertas fueron nombrando, uno por uno. En el último peldaño hay alguien sentado, de espaldas, como si llevara ahí desde el patio.",
    sceneGloss:
      "The room has no shelves. It has the silence the other doors have been naming, one by one. On the last step someone is sitting, back turned, as if he had been there since the patio.",
    scrap: "Lo inefable no es un vacío. Es lo que queda cuando todas las puertas ya tienen nombre. —M",
    scrapGloss: "The ineffable is not a void. It is what remains when every door already has a name. —M",
    actions: [
      {
        id: "peldaño",
        label: "No decir su nombre todavía",
        labelGloss: "Do not say his name yet",
        text: "Él no se vuelve. Espera una palabra que no cabe del todo en la boca, y que aun así se puede elegir.",
        textGloss: "He does not turn. He is waiting for a word that does not quite fit in the mouth, and that can still be chosen.",
      },
      {
        id: "elegir",
        label: "Elegir la palabra justa",
        labelGloss: "Choose the precise word",
        trial: {
          prompt: "¿Qué frase trata «inefable» con precisión?",
          promptGloss: "Which sentence treats “inefable” with precision?",
          hint: "Lo que no cabe entero en una frase. No lo ruidoso ni lo ya escrito.",
          hintGloss: "What does not fit whole into a sentence. Not the noisy, nor what is already written.",
          options: [
            opt(
              "Era inefable, así que se dijo entero en una palabra vulgar.",
              "Si cabe entero en una palabra vulgar, no era inefable.",
              "If it fits whole in a crude word, it was not ineffable.",
            ),
            opt(
              "Inefable significa ruidoso, largo y obvio.",
              "Eso es casi el antónimo.",
              "That is nearly the antonym.",
            ),
            opt(
              "Lo que la ciudad guardaba era casi inefable.",
              "Mateo se vuelve. «Ya puedes decir el nombre de las cosas», dice. «Y el mío.»",
              "Mateo turns. “Now you can say the name of things,” he says. “And mine.”",
              true,
            ),
            opt(
              "Era inefable: estaba escrito en el letrero, claro y entero.",
              "Un letrero claro es lo decible.",
              "A clear sign is the sayable.",
            ),
          ],
        },
      },
    ],
    exits: [
      { dir: "afuera", to: "c2-galeria", label: "la galería", labelGloss: "the gallery" },
      { dir: "abajo", to: "c2-repaso", label: "el claustro", labelGloss: "the cloister" },
    ],
    recall: {
      prompt: "Quieres decir que el perdón de Mateo no cabe en un eslogan. ¿Qué frase acierta?",
      promptGloss: "You want to say that Mateo's forgiveness does not fit in a slogan. Which sentence is right?",
      hint: "Casi inefable: se rodea, no se agota.",
      hintGloss: "Almost ineffable: you circle it, you do not exhaust it.",
      options: [
        opt(
          "Su perdón era casi inefable: ninguna frase lo agotaba.",
          "La palabra trabaja en su borde.",
          "The word works at its edge.",
          true,
        ),
        opt(
          "Su perdón era inefable y cupo en el eslogan.",
          "Si cupo en el eslogan, dejó de ser inefable.",
          "If it fit in the slogan, it stopped being ineffable.",
        ),
        opt("Inefable aquí quiere decir fácil de gritar.", "Gritar lo fácil es lo contrario.", "Shouting the easy thing is the opposite."),
        opt(
          "Lo inefable ya estaba en el letrero del patio, completo.",
          "El patio tenía «hola», no lo inefable.",
          "The patio had “hola,” not the ineffable.",
        ),
      ],
    },
  },
  {
    id: "c2-repaso",
    level: "C2",
    place: "El claustro",
    placeGloss: "The cloister",
    word: "repaso",
    pos: "sustantivo",
    gloss: "review",
    example: "El claustro guarda el último repaso.",
    exampleGloss: "The cloister keeps the last review.",
    grammar: "The last review is not a new door. It is whether the precise words still answer when the room is gone.",
    scene:
      "Un claustro cuadrado, abierto al cielo oscuro. Mateo no baja hasta aquí. Las palabras sí, si las traes tú.",
    sceneGloss:
      "A square cloister, open to the dark sky. Mateo does not come down here. The words do, if you bring them.",
    scrap: "No me fui. Estaba del lado de dentro de cada puerta. Ya puedes decir mi nombre, y el de las cosas. —Mateo",
    scrapGloss: "I did not leave. I was on the inside of every door. Now you can say my name, and the names of things. —Mateo",
    review: true,
    actions: [
      {
        id: "cielo",
        label: "Mirar el cielo del claustro",
        labelGloss: "Look at the cloister sky",
        text: "No hay letrero. Hay sitio para tres frases que ya no dependen de su cuarto.",
        textGloss: "There is no sign. There is room for three sentences that no longer depend on their room.",
      },
    ],
    exits: [{ dir: "arriba", to: "c2-ultima", label: "la última sala", labelGloss: "the last room" }],
  },
];
