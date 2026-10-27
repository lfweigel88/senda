import type { Room } from "./types";
import { opt } from "./types";

export const C1: Room[] = [
  {
    id: "c1-ateneo",
    level: "C1",
    place: "El ateneo",
    placeGloss: "The athenaeum",
    word: "no obstante",
    pos: "conector formal",
    gloss: "nevertheless",
    example: "El argumento es elegante; no obstante, no demuestra la tesis.",
    exampleGloss: "The argument is elegant; nevertheless, it does not prove the thesis.",
    grammar:
      "No obstante is a formal hinge: it concedes, then contrasts. It is close to sin embargo, but it belongs to essays and speeches, not to a shrug. A sentence that never turns is not using it.",
    scene:
      "El ateneo tiene lámparas bajas y sillas que no invitan a quedarse. Dos estudiosos discuten un ensayo de Mateo. Uno admira la prosa. El otro pide la prueba.",
    sceneGloss:
      "The athenaeum has low lamps and chairs that do not invite you to stay. Two scholars are discussing an essay by Mateo. One admires the prose. The other asks for proof.",
    scrap: "El argumento es elegante; no obstante, no me nombra. La formalidad no es la verdad. —M",
    scrapGloss: "The argument is elegant; nevertheless, it does not name me. Formality is not the truth. —M",
    actions: [
      {
        id: "ensayo",
        label: "Pedir el ensayo",
        labelGloss: "Ask for the essay",
        text: "Te dejan una cuartilla. La prosa brilla. La tesis, en el último párrafo, no aparece.",
        textGloss: "They hand you a sheet. The prose shines. The thesis, in the last paragraph, never appears.",
      },
      {
        id: "replicar",
        label: "Replicar con registro formal",
        labelGloss: "Reply in a formal register",
        trial: {
          prompt: "Concedes la elegancia y niegas la prueba, en registro formal. ¿Qué frase sirve?",
          promptGloss: "You concede the elegance and deny the proof, in a formal register. Which sentence works?",
          hint: "No obstante abre el contraste después de conceder.",
          hintGloss: "No obstante opens the contrast after the concession.",
          options: [
            opt(
              "El argumento es elegante, pero bueno, no.",
              "Se entiende, y se cae el registro. El ateneo no habla así.",
              "It is clear, and the register collapses. The athenaeum does not talk like that.",
            ),
            opt(
              "No obstante el argumento es elegante y demuestra la tesis.",
              "Aquí no hay contraste: dices que sí demuestra.",
              "There is no contrast here: you say it does prove the thesis.",
            ),
            opt(
              "El argumento es elegante; no obstante, no demuestra la tesis.",
              "Un estudioso cierra el cuaderno. «Eso sí es una objeción.»",
              "One scholar closes the notebook. “That is an objection.”",
              true,
            ),
            opt(
              "El argumento no obstante elegante es.",
              "El conector no se traga así, en medio, sin frase.",
              "The connector cannot be swallowed like that, in the middle, with no clause.",
            ),
          ],
        },
      },
    ],
    exits: [{ dir: "este", to: "c1-tertulia", label: "la tertulia", labelGloss: "the salon" }],
    recall: {
      prompt: "Otra concesión formal: el plano del archivo es útil; aun así, la puerta sigue sin número.",
      promptGloss: "Another formal concession: the archive plan is useful; even so, the door still has no number.",
      hint: "Útil; no obstante, incompleto.",
      hintGloss: "Useful; nevertheless, incomplete.",
      options: [
        opt(
          "El plano es útil; no obstante, no numera la puerta.",
          "Concedes y corriges en el mismo aliento formal.",
          "You concede and correct in the same formal breath.",
          true,
        ),
        opt(
          "El plano es útil; no obstante, numera la puerta.",
          "La segunda mitad no contrasta: repite el éxito.",
          "The second half does not contrast: it repeats the success.",
        ),
        opt(
          "El plano es útil, o sea, no obstante, qué sé yo.",
          "El registro se rompe.",
          "The register breaks.",
        ),
        opt(
          "No obstante útil el plano puerta.",
          "No hay sintaxis, solo piezas.",
          "There is no syntax, only pieces.",
        ),
      ],
    },
  },
  {
    id: "c1-tertulia",
    level: "C1",
    place: "La tertulia",
    placeGloss: "The salon",
    word: "matiz",
    pos: "sustantivo",
    gloss: "shade of meaning",
    example: "Hay un matiz entre callar y guardar silencio.",
    exampleGloss: "There is a shade of difference between falling silent and keeping silent.",
    grammar:
      "Un matiz is a fine difference, not a shout and not proof that two words are identical. If you use it to mean “exactly the same,” the word has slipped.",
    scene:
      "La tertulia cabe en un salón con demasiadas sillas. Alguien dice que callar y guardar silencio son la misma cosa. Nadie está de acuerdo del todo, y nadie sabe decir por qué.",
    sceneGloss:
      "The salon fits in a room with too many chairs. Someone says that falling silent and keeping silent are the same thing. No one quite agrees, and no one knows how to say why.",
    scrap: "Hay un matiz entre irse y desaparecer. Yo hice lo segundo solo en apariencia. —M",
    scrapGloss: "There is a shade of difference between leaving and disappearing. I did the second only in appearance. —M",
    actions: [
      {
        id: "sillas",
        label: "Escuchar la discusión",
        labelGloss: "Listen to the argument",
        text: "Callar les suena a derrota. Guardar silencio, a elección. La diferencia es pequeña y les importa.",
        textGloss: "Falling silent sounds like defeat to them. Keeping silent sounds like a choice. The difference is small and it matters to them.",
      },
      {
        id: "precisar",
        label: "Precisar la diferencia",
        labelGloss: "Name the difference precisely",
        trial: {
          prompt: "¿Qué frase usa «matiz» como diferencia fina de sentido?",
          promptGloss: "Which sentence uses “matiz” as a fine difference of meaning?",
          hint: "Un matiz separa, no iguala.",
          hintGloss: "A matiz separates; it does not equate.",
          options: [
            opt(
              "Hay un matiz, es decir, las dos palabras son idénticas.",
              "Si son idénticas, no hay matiz.",
              "If they are identical, there is no shade of difference.",
            ),
            opt(
              "Hay un matiz entre callar y guardar silencio.",
              "La tertulia se inclina, por fin, hacia la precisión.",
              "The salon leans, at last, toward precision.",
              true,
            ),
            opt(
              "El matiz es un grito que borra la diferencia.",
              "Un grito no es un matiz.",
              "A shout is not a shade of meaning.",
            ),
            opt(
              "Un matiz significa que la frase está siempre mal escrita.",
              "Matiz no es un veredicto de ortografía.",
              "Matiz is not a spelling verdict.",
            ),
          ],
        },
      },
    ],
    exits: [
      { dir: "oeste", to: "c1-ateneo", label: "el ateneo", labelGloss: "the athenaeum" },
      { dir: "norte", to: "c1-despacho", label: "el despacho", labelGloss: "the study" },
    ],
    recall: {
      prompt: "Quieres separar «irse» de «desaparecer» sin decir que son lo mismo.",
      promptGloss: "You want to separate “to leave” from “to disappear” without saying they are the same.",
      hint: "Hay un matiz entre X y Y.",
      hintGloss: "Hay un matiz entre X and Y.",
      options: [
        opt(
          "Hay un matiz entre irse y desaparecer.",
          "La diferencia queda nombrada y pequeña.",
          "The difference is named, and it stays small.",
          true,
        ),
        opt(
          "No hay ningún matiz: irse es desaparecer.",
          "Eso niega el matiz.",
          "That denies the shade of difference.",
        ),
        opt(
          "El matiz grita que son iguales.",
          "Ni grita ni iguala.",
          "It neither shouts nor equates them.",
        ),
        opt(
          "Un matiz es el color de la puerta y nada más.",
          "Puede ser un color, pero aquí el sentido es de lengua, no de pintura.",
          "It can be a color, but here the sense is linguistic, not paint.",
        ),
      ],
    },
  },
  {
    id: "c1-despacho",
    level: "C1",
    place: "El despacho",
    placeGloss: "The study",
    word: "en la medida en que",
    pos: "locución",
    gloss: "insofar as",
    example: "El texto importa en la medida en que precisa lo perdido.",
    exampleGloss: "The text matters insofar as it makes precise what was lost.",
    grammar:
      "En la medida en que limits a claim: it matters to the extent that something is true. En la medida de que is the slip. A medida que means “as” in time, a different tool.",
    scene:
      "El despacho es de otro siglo: madera, una ventana alta, un texto sin título. Al margen, Mateo escribió una condición y la dejó a medias.",
    sceneGloss:
      "The study is from another century: wood, a high window, an untitled text. In the margin, Mateo wrote a condition and left it unfinished.",
    scrap: "Esto importa en la medida en que puedas decirlo con precisión, no con adorno. —M",
    scrapGloss: "This matters insofar as you can say it with precision, not with ornament. —M",
    actions: [
      {
        id: "margen",
        label: "Leer el margen",
        labelGloss: "Read the margin",
        text: "Solo tres palabras firmes: «importa si precisa». El resto es un borrón.",
        textGloss: "Only three steady words: “it matters if it is precise.” The rest is a blot.",
      },
      {
        id: "limitar",
        label: "Limitar la afirmación",
        labelGloss: "Limit the claim",
        trial: {
          prompt: "¿Qué frase limita de verdad el valor del texto?",
          promptGloss: "Which sentence truly limits the value of the text?",
          hint: "La locución completa es en la medida en que.",
          hintGloss: "The full phrase is en la medida en que.",
          options: [
            opt(
              "El texto importa en la medida de que precisa lo perdido.",
              "Se oye a menudo «de que». La forma cuidada es en que.",
              "People often say “de que.” The careful form is en que.",
            ),
            opt(
              "El texto importa a medida que ya terminó.",
              "A medida que ordena en el tiempo. No limita una tesis.",
              "A medida que orders things in time. It does not limit a thesis.",
            ),
            opt(
              "El texto importa en la medida en que precisa lo perdido.",
              "La ventana deja pasar un poco más de luz.",
              "The window lets in a little more light.",
              true,
            ),
            opt(
              "El texto en medida importa precisa.",
              "Faltan las piezas de la locución.",
              "The pieces of the phrase are missing.",
            ),
          ],
        },
      },
    ],
    exits: [
      { dir: "sur", to: "c1-tertulia", label: "la tertulia", labelGloss: "the salon" },
      { dir: "este", to: "c1-azotea", label: "la azotea", labelGloss: "the rooftop" },
    ],
    recall: {
      prompt: "Aplicas la misma lima a otra idea: la ironía vale solo cuando el lector puede oír el doble sentido.",
      promptGloss: "You apply the same edge to another idea: irony is worth something only when the reader can hear the double sense.",
      hint: "Vale en la medida en que…",
      hintGloss: "It is worth something insofar as…",
      options: [
        opt(
          "La ironía vale en la medida en que se oye el doble sentido.",
          "La condición queda puesta, no el adorno.",
          "The condition is set, not the ornament.",
          true,
        ),
        opt(
          "La ironía vale en la medida de que se oye.",
          "De que es la forma que este despacho no acepta.",
          "De que is the form this study does not accept.",
        ),
        opt(
          "La ironía vale a medida que ayer se oyó.",
          "A medida que cuenta un proceso, y ayer lo cierra mal.",
          "A medida que tells a process, and yesterday closes it badly.",
        ),
        opt(
          "En medida la ironía vale que.",
          "El esqueleto de la locución no está.",
          "The skeleton of the phrase is not there.",
        ),
      ],
    },
  },
  {
    id: "c1-azotea",
    level: "C1",
    place: "La azotea",
    placeGloss: "The rooftop",
    word: "ironía",
    pos: "sustantivo",
    gloss: "irony",
    example: "Dice suerte y señala una pérdida.",
    exampleGloss: "He says luck and points to a loss.",
    grammar:
      "Irony says one thing and means a pressure against it. A literal reading of “qué suerte” here misses the bitterness. An order, or a weather report, is a different speech act.",
    scene:
      "Desde la azotea se ve la ciudad en silencio: patios, un puente, una plaza. En la baranda hay un cuaderno. La frase está subida de tono: «Qué suerte: una ciudad muda, justo lo que quería un escritor.»",
    sceneGloss:
      "From the rooftop you see the city in silence: patios, a bridge, a square. On the railing there is a notebook. The sentence is pitched high: “What luck: a mute city, just what a writer wanted.”",
    scrap: "Qué suerte, una ciudad muda. No lo creas al pie de la letra: es ironía, y es mía. —M",
    scrapGloss: "What luck, a mute city. Do not take it literally: it is irony, and it is mine. —M",
    actions: [
      {
        id: "ciudad",
        label: "Mirar la ciudad",
        labelGloss: "Look at the city",
        text: "Abajo nadie llama a nadie. La suerte, si la hay, no se oye.",
        textGloss: "Below, no one calls anyone. The luck, if there is any, cannot be heard.",
      },
      {
        id: "tono",
        label: "Nombrar el tono",
        labelGloss: "Name the tone",
        trial: {
          prompt: "«Qué suerte: una ciudad muda, justo lo que quería un escritor.» ¿Qué hace esa frase?",
          promptGloss: "“What luck: a mute city, just what a writer wanted.” What does that sentence do?",
          hint: "La palabra suerte empuja hacia el lado contrario.",
          hintGloss: "The word luck pushes toward the opposite side.",
          options: [
            opt(
              "Celebra de forma literal el silencio.",
              "Si fuera literal, el escritor estaría contento. El cuaderno no lo está.",
              "If it were literal, the writer would be glad. The notebook is not.",
            ),
            opt(
              "Usa la ironía: dice suerte y señala una pérdida.",
              "El viento pasa la página. No hay más texto.",
              "The wind turns the page. There is no more text.",
              true,
            ),
            opt("Da una orden al lector.", "No manda. Comenta, y el comentario muerde.", "It does not command. It comments, and the comment bites."),
            opt("Describe el tiempo de ayer.", "No hay clima en la frase. Hay un juicio disfrazado.", "There is no weather in the sentence. There is a disguised judgment."),
          ],
        },
      },
    ],
    exits: [
      { dir: "oeste", to: "c1-despacho", label: "el despacho", labelGloss: "the study" },
      { dir: "abajo", to: "c1-repaso", label: "la antesala", labelGloss: "the anteroom" },
    ],
    recall: {
      prompt: "Rosa dice: «Qué alegría, una posada vacía.» El tono es amargo. ¿Qué reconoces?",
      promptGloss: "Rosa says: “What joy, an empty inn.” The tone is bitter. What do you recognize?",
      hint: "Alegría dicha contra la pérdida.",
      hintGloss: "Joy spoken against a loss.",
      options: [
        opt(
          "Ironía: la alegría nombra lo que duele.",
          "La palabra feliz trabaja en contra.",
          "The happy word works against itself.",
          true,
        ),
        opt("Alegría literal: la posada vacía le conviene.", "El tono amargo impide esa lectura.", "The bitter tone blocks that reading."),
        opt("Una orden de cerrar la posada.", "No hay imperativo.", "There is no imperative."),
        opt("Un parte del tiempo.", "Vacía no es el clima.", "Empty is not the weather."),
      ],
    },
  },
  {
    id: "c1-repaso",
    level: "C1",
    place: "La antesala",
    placeGloss: "The anteroom",
    word: "repaso",
    pos: "sustantivo",
    gloss: "review",
    example: "La antesala pide un repaso sin prisa.",
    exampleGloss: "The anteroom asks for an unhurried review.",
    grammar: "At this level the echo is not a drill. It is whether the distinction still stands when the room changes.",
    scene:
      "Una antesala sin ventanas, entre la azotea y una escalera que baja. Aquí no se aprende una palabra nueva. Se comprueba si las finas siguen en su sitio.",
    sceneGloss:
      "A windowless anteroom, between the rooftop and a stair that goes down. Nothing new is learned here. You check whether the fine distinctions are still in place.",
    scrap: "Abajo, la biblioteca guarda lo que casi no se puede decir. Baja sin prisa. —M",
    scrapGloss: "Below, the library keeps what can hardly be said. Go down without hurry. —M",
    review: true,
    actions: [
      {
        id: "escalera",
        label: "Mirar la escalera",
        labelGloss: "Look at the stair",
        text: "Los peldaños huelen a tinta. No hay letrero. La bajada espera.",
        textGloss: "The steps smell of ink. There is no sign. The way down waits.",
      },
    ],
    exits: [{ dir: "arriba", to: "c1-azotea", label: "la azotea", labelGloss: "the rooftop" }],
  },
];
