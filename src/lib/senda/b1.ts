import type { Room } from "./types";
import { opt } from "./types";

export const B1: Room[] = [
  {
    id: "b1-libreria",
    level: "B1",
    place: "La librería",
    placeGloss: "The bookshop",
    word: "para",
    pos: "preposición",
    gloss: "in order to",
    example: "Se quedó para ganar dinero.",
    exampleGloss: "He stayed in order to earn money.",
    grammar:
      "Para + infinitive states a purpose. After para, the verb stays in the infinitive: para ganar, not para ganó.",
    scene:
      "La librería huele a papel viejo. En la puerta hay un cartel: «Se busca dependiente para ordenar libros.» La dueña recuerda a Mateo. «Se quedó una semana. No era por aburrimiento.»",
    sceneGloss:
      "The bookshop smells of old paper. On the door there is a sign: “Help wanted to sort books.” The owner remembers Mateo. “He stayed a week. It was not out of boredom.”",
    scrap: "Me quedé para ganar el billete de más adentro. Para marca el propósito, no el impulso. —M",
    scrapGloss: "I stayed in order to earn the ticket further in. Para marks the purpose, not the impulse. —M",
    actions: [
      {
        id: "estante",
        label: "Mirar el estante vacío",
        labelGloss: "Look at the empty shelf",
        text: "Falta una fila de novelas. En el hueco hay un papel: «volvía por la noche, para no cerrar tarde».",
        textGloss: "A row of novels is missing. In the gap there is a slip: “he came back at night, so as not to close late.”",
      },
      {
        id: "proposito",
        label: "Explicar por qué se quedó",
        labelGloss: "Explain why he stayed",
        trial: {
          prompt: "La dueña te pide la frase exacta del propósito. ¿Cuál escribes?",
          promptGloss: "The owner asks you for the exact sentence of purpose. Which do you write?",
          hint: "Para + infinitivo. Un solo verbo conjugado, el primero.",
          hintGloss: "Para + infinitive. Only one conjugated verb, the first one.",
          options: [
            opt("Se quedó para ganó dinero.", "Después de para no se conjuga el segundo verbo.", "After para the second verb is not conjugated."),
            opt("Se quedó para el ganar dinero.", "El infinitivo no lleva artículo aquí.", "The infinitive does not take an article here."),
            opt("Se quedó para ganar dinero.", "La dueña cierra el cartel. «Eso. Un propósito.»", "The owner takes down the sign. “That. A purpose.”", true),
            opt("Para se quedó ganar dinero.", "El orden se rompe. El sujeto y se quedó van primero.", "The order breaks. The subject and se quedó come first."),
          ],
        },
      },
    ],
    exits: [{ dir: "este", to: "b1-periodico", label: "el periódico", labelGloss: "the newspaper" }],
    recall: {
      prompt: "Tú estudias español con un fin claro: leer la carta de Mateo. ¿Cómo lo dices?",
      promptGloss: "You study Spanish with a clear aim: to read Mateo's letter. How do you say it?",
      hint: "Estudio + para + infinitivo.",
      hintGloss: "Estudio + para + infinitive.",
      options: [
        opt("Estudio español para leer su carta.", "Para + infinitivo: el fin de estudiar.", "Para + infinitive: the purpose of studying.", true),
        opt("Estudio español para leo su carta.", "Leo está conjugado. Tiene que ser leer.", "Leo is conjugated. It has to be leer."),
        opt("Estudio español para leí su carta.", "El pasado no entra después de para en esta estructura.", "The past does not go after para in this structure."),
        opt("Para estudio leer su carta.", "Para no abre la frase de esa manera.", "Para does not open the sentence that way."),
      ],
    },
  },
  {
    id: "b1-periodico",
    level: "B1",
    place: "El periódico",
    placeGloss: "The newspaper",
    word: "creo que",
    pos: "locución",
    gloss: "I think that",
    example: "Creo que la ciudad necesita sus palabras.",
    exampleGloss: "I think the city needs its words.",
    grammar:
      "After an affirmative creo que, Spanish uses the indicative: creo que necesita. The subjunctive (necesite) belongs to doubt and denial, not to this affirmation.",
    scene:
      "La redacción es una sola mesa larga. El titular de hoy: «La ciudad pierde sus nombres.» La directora te ofrece una silla. «¿Tú qué crees? Sin adorno.»",
    sceneGloss:
      "The newsroom is a single long table. Today's headline: “The city is losing its names.” The editor offers you a chair. “What do you think? No decoration.”",
    scrap: "Creo que la ciudad enferma cuando nadie nombra las cosas. Creo que afirma: indicativo. —M",
    scrapGloss: "I believe the city sickens when no one names things. Creo que affirms: indicative. —M",
    actions: [
      {
        id: "titular",
        label: "Leer el titular",
        labelGloss: "Read the headline",
        text: "Debajo del titular, una columna a medias. La última línea es de Mateo y se corta en «creo que».",
        textGloss: "Under the headline, a half-finished column. The last line is Mateo's and it breaks off at “creo que.”",
      },
      {
        id: "opinar",
        label: "Dar tu opinión",
        labelGloss: "Give your opinion",
        trial: {
          prompt: "Afirmas tu idea. No dudas. ¿Qué frase entregas?",
          promptGloss: "You state your idea. You are not doubting. Which sentence do you hand in?",
          hint: "Creo que + indicativo cuando afirmas.",
          hintGloss: "Creo que + indicative when you affirm.",
          options: [
            opt("Creo que la ciudad necesite sus palabras.", "Necesite es subjuntivo. Aquí no hay duda.", "Necesite is subjunctive. There is no doubt here."),
            opt("Creo la ciudad que necesita sus palabras.", "Que va justo después de creo.", "Que goes right after creo."),
            opt("Estoy creo que la ciudad necesita.", "No se mezcla estar con creo.", "Estar is not mixed with creo."),
            opt("Creo que la ciudad necesita sus palabras.", "La directora asiente. «Indicativo. Lo publicamos.»", "The editor nods. “Indicative. We'll publish it.”", true),
          ],
        },
      },
    ],
    exits: [
      { dir: "oeste", to: "b1-libreria", label: "la librería", labelGloss: "the bookshop" },
      { dir: "norte", to: "b1-clinica", label: "la clínica", labelGloss: "the clinic" },
    ],
    recall: {
      prompt: "Un compañero afirma otra cosa, sin dudar: el silencio ayuda. Él habla de sí mismo.",
      promptGloss: "A colleague states something else, without doubting: silence helps. He is speaking for himself.",
      hint: "Él cree que + indicativo.",
      hintGloss: "He believes that + indicative.",
      options: [
        opt("Cree que el silencio ayuda.", "Afirmación: ayuda, no ayude.", "Affirmation: ayuda, not ayude.", true),
        opt("Cree que el silencio ayude.", "Ayude abre una duda que él no tiene.", "Ayude opens a doubt he does not have."),
        opt("Creo que el silencio ayuda.", "Creo es tú. Aquí habla él: cree.", "Creo is you. Here he speaks: cree."),
        opt("Cree el silencio que ayuda.", "El que está desplazado.", "Que is out of place."),
      ],
    },
  },
  {
    id: "b1-clinica",
    level: "B1",
    place: "La clínica",
    placeGloss: "The clinic",
    word: "doler",
    pos: "verbo",
    gloss: "to hurt",
    example: "Le dolía la cabeza.",
    exampleGloss: "His head hurt.",
    grammar:
      "Doler works like gustar. The head is the subject: le dolía la cabeza. Not él dolía la cabeza. Plural aches take dolían: le dolían los pies.",
    scene:
      "La sala de espera tiene una luz verde. Una enfermera revisa una ficha. «Vino por la tarde. No dijo mucho. Le dolía la cabeza después del tren.»",
    sceneGloss:
      "The waiting room has a green light. A nurse checks a chart. “He came in the afternoon. He did not say much. His head hurt after the train.”",
    scrap: "Me dolía la cabeza, no yo a ella. El dolor es un verbo al revés, como gustar. —M",
    scrapGloss: "My head hurt, not I hurt it. Pain is a backwards verb, like gustar. —M",
    actions: [
      {
        id: "ficha",
        label: "Mirar la ficha",
        labelGloss: "Look at the chart",
        text: "Nombre: M. Síntoma: cabeza. Nota: «no quiso quedarse».",
        textGloss: "Name: M. Symptom: head. Note: “he did not want to stay.”",
      },
      {
        id: "dolor",
        label: "Explicar el dolor",
        labelGloss: "Explain the pain",
        trial: {
          prompt: "La enfermera te pide que lo repitas para otra ficha. ¿Qué frase es la buena?",
          promptGloss: "The nurse asks you to repeat it for another chart. Which sentence is the right one?",
          hint: "La cabeza es el sujeto. A Mateo le dolía.",
          hintGloss: "The head is the subject. A Mateo le dolía.",
          options: [
            opt("Mateo dolía la cabeza.", "Mateo no es el sujeto de doler. Duele la cabeza.", "Mateo is not the subject of doler. The head hurts."),
            opt("A Mateo le dolían la cabeza.", "La cabeza es singular: dolía, no dolían.", "The head is singular: dolía, not dolían."),
            opt("A Mateo le dolía la cabeza.", "La enfermera copia la frase sin corregirla.", "The nurse copies the sentence without correcting it.", true),
            opt("Mateo estaba dolor en la cabeza.", "Dolor no funciona así. El verbo es doler.", "Dolor does not work that way. The verb is doler."),
          ],
        },
      },
    ],
    exits: [
      { dir: "sur", to: "b1-periodico", label: "el periódico", labelGloss: "the newspaper" },
      { dir: "este", to: "b1-reunion", label: "la reunión", labelGloss: "the meeting" },
    ],
    recall: {
      prompt: "Ahora eres tú, y te duelen los pies, los dos, después de caminar.",
      promptGloss: "Now it is you, and both your feet hurt after walking.",
      hint: "A mí me duelen los pies. Plural.",
      hintGloss: "A mí me duelen los pies. Plural.",
      options: [
        opt("Me duelen los pies.", "Pies en plural: duelen. A ti: me.", "Feet in the plural: duelen. For you: me.", true),
        opt("Me duele los pies.", "Duele es singular. Los pies piden duelen.", "Duele is singular. Feet need duelen."),
        opt("Yo duelo los pies.", "Tú no dueles los pies. Te duelen ellos.", "You do not ache the feet. They ache to you."),
        opt("Me duelen el pie.", "Si es uno, duele el pie. Si son dos, duelen los pies.", "If it is one, duele el pie. If two, duelen los pies."),
      ],
    },
  },
  {
    id: "b1-reunion",
    level: "B1",
    place: "La reunión",
    placeGloss: "The meeting",
    word: "ir a",
    pos: "perífrasis",
    gloss: "to be going to",
    example: "Vamos a buscar en el puente.",
    exampleGloss: "We are going to look on the bridge.",
    grammar:
      "Ir a + infinitive states a plan: vamos a buscar. Do not drop a, and do not conjugate the second verb.",
    scene:
      "Cinco vecinos hablan en un patio interior. Alguien dibuja el puente en una servilleta. «Si llega tarde, el plan sigue», dice una mujer. Nadie nombra a Mateo en voz alta.",
    sceneGloss:
      "Five neighbors are talking in an inner courtyard. Someone draws the bridge on a napkin. “If he arrives late, the plan goes on,” a woman says. No one says Mateo's name out loud.",
    scrap: "Vamos a cruzar el puente al anochecer. Si llegas tarde, el plan sigue sin ti. —M",
    scrapGloss: "We are going to cross the bridge at nightfall. If you arrive late, the plan goes on without you. —M",
    actions: [
      {
        id: "servilleta",
        label: "Mirar la servilleta",
        labelGloss: "Look at the napkin",
        text: "Una flecha señala el puente. Debajo, la hora: anochecer. La letra no es la de Mateo.",
        textGloss: "An arrow points to the bridge. Under it, the time: nightfall. The handwriting is not Mateo's.",
      },
      {
        id: "plan",
        label: "Decir el plan",
        labelGloss: "State the plan",
        trial: {
          prompt: "Te incluyen. Esta noche el grupo va a buscar en el puente. ¿Cómo lo dices?",
          promptGloss: "They include you. Tonight the group is going to search on the bridge. How do you say it?",
          hint: "Vamos a + infinitivo.",
          hintGloss: "Vamos a + infinitive.",
          options: [
            opt("Esta noche vamos buscar en el puente.", "Falta la a de ir a.", "The a of ir a is missing."),
            opt("Esta noche vamos a buscamos en el puente.", "Buscamos está conjugado. Después de a va buscar.", "Buscamos is conjugated. After a comes buscar."),
            opt("Ayer vamos a buscar mañana.", "Ayer y mañana no pueden ser el mismo plan.", "Yesterday and tomorrow cannot be the same plan."),
            opt("Esta noche vamos a buscar en el puente.", "La mujer dobla la servilleta. «Entonces estás.»", "The woman folds the napkin. “Then you are in.”", true),
          ],
        },
      },
    ],
    exits: [
      { dir: "oeste", to: "b1-clinica", label: "la clínica", labelGloss: "the clinic" },
      { dir: "norte", to: "b1-puente", label: "el puente", labelGloss: "the bridge" },
    ],
    recall: {
      prompt: "El plan cambia: solo tú vas a esperar en la librería, no en el puente.",
      promptGloss: "The plan changes: only you are going to wait at the bookshop, not on the bridge.",
      hint: "Yo voy a + infinitivo.",
      hintGloss: "I voy a + infinitive.",
      options: [
        opt("Voy a esperar en la librería.", "Yo voy a esperar: un plan personal.", "I am going to wait: a personal plan.", true),
        opt("Voy esperar en la librería.", "Falta a.", "A is missing."),
        opt("Vamos a esperar en la librería.", "Vamos incluye a otros. El plan ahora es solo tuyo.", "Vamos includes others. The plan is now only yours."),
        opt("Voy a espero en la librería.", "Espero no puede ir conjugado después de a.", "Espero cannot be conjugated after a."),
      ],
    },
  },
  {
    id: "b1-puente",
    level: "B1",
    place: "El puente",
    placeGloss: "The bridge",
    word: "aunque",
    pos: "conjunción",
    gloss: "although / even though",
    example: "Aunque llueve, cruzamos.",
    exampleGloss: "Although it is raining, we cross.",
    grammar:
      "Aunque concedes un hecho y sigues: Aunque llueve, cruzamos. No añadas pero en la misma frase. Aunque + infinitivo no conjuga.",
    scene:
      "El puente está mojado. El río va alto. Dos vecinos se detienen. Uno dice que es mejor volver. La mujer de la servilleta no se mueve.",
    sceneGloss:
      "The bridge is wet. The river is high. Two neighbors stop. One says it is better to turn back. The woman with the napkin does not move.",
    scrap: "Aunque llueva o aunque llueve: la concesión no cancela el paso. Yo crucé. —M",
    scrapGloss: "Even if it rains or although it is raining: the concession does not cancel the crossing. I crossed. —M",
    actions: [
      {
        id: "rio",
        label: "Mirar el río",
        labelGloss: "Look at the river",
        text: "El agua cubre el primer escalón. Al otro lado hay una luz en una ventana alta. No se ve a nadie.",
        textGloss: "The water covers the first step. On the other side there is a light in a high window. No one is visible.",
      },
      {
        id: "cruzar",
        label: "Decidir el cruce",
        labelGloss: "Decide the crossing",
        trial: {
          prompt: "Está lloviendo de verdad, y aun así el grupo cruza. ¿Qué frase lo dice?",
          promptGloss: "It really is raining, and even so the group crosses. Which sentence says that?",
          hint: "Aunque + frase completa. Sin pero después.",
          hintGloss: "Aunque + a full clause. No pero after it.",
          options: [
            opt("Aunque llueve, pero cruzamos.", "Aunque ya concede. Pero repite el contraste y sobra.", "Aunque already concedes. Pero repeats the contrast and is too much."),
            opt("Aunque llover, cruzamos.", "Llover tiene que conjugarse: llueve.", "Llover has to be conjugated: llueve."),
            opt("Aunque llueve, cruzamos.", "La mujer da el primer paso. Los demás la siguen.", "The woman takes the first step. The others follow.", true),
            opt("Llueve aunque, cruzamos el no.", "Aunque no se coloca así, y el sentido se invierte.", "Aunque is not placed like that, and the meaning flips."),
          ],
        },
      },
    ],
    exits: [
      { dir: "sur", to: "b1-reunion", label: "la reunión", labelGloss: "the meeting" },
      { dir: "este", to: "b1-repaso", label: "el descanso", labelGloss: "the landing" },
    ],
    recall: {
      prompt: "Otro día: hace sol, no hay peligro, pero estás cansado. Aun así caminas.",
      promptGloss: "Another day: it is sunny, there is no danger, but you are tired. Even so you walk.",
      hint: "Aunque + estoy cansado, camino.",
      hintGloss: "Aunque + I am tired, I walk.",
      options: [
        opt("Aunque estoy cansado, camino.", "Concedes el cansancio y sigues.", "You concede the tiredness and go on.", true),
        opt("Aunque estoy cansado, pero camino.", "Pero sobra después de aunque.", "Pero is extra after aunque."),
        opt("Aunque estar cansado, camino.", "Estar no va en infinitivo aquí.", "Estar does not stay in the infinitive here."),
        opt("Aunque no camino porque estoy cansado.", "Eso dice lo contrario: que no caminas.", "That says the opposite: that you do not walk."),
      ],
    },
  },
  {
    id: "b1-repaso",
    level: "B1",
    place: "El descanso",
    placeGloss: "The landing",
    word: "repaso",
    pos: "sustantivo",
    gloss: "review",
    example: "En el descanso hago un repaso.",
    exampleGloss: "On the landing I review.",
    grammar: "A firm word is one you can use in a sentence you have not seen in its own room.",
    scene:
      "Un rellano entre el puente y una plaza que todavía no habla. Aquí no hay letreros nuevos. Hay tres preguntas, si ya tienes con qué contestarlas.",
    sceneGloss:
      "A landing between the bridge and a square that does not speak yet. There are no new signs here. There are three questions, if you already have something to answer them with.",
    scrap: "En la plaza discuten si el silencio es más seguro. Entra en el subjuntivo: ya no basta con afirmar. —M",
    scrapGloss: "In the square they argue whether silence is safer. Step into the subjunctive: affirming is no longer enough. —M",
    review: true,
    actions: [
      {
        id: "rellano",
        label: "Apoyarte en la baranda",
        labelGloss: "Lean on the railing",
        text: "Abajo, el río sigue. Arriba, alguien discute sin que se entiendan las palabras.",
        textGloss: "Below, the river goes on. Above, someone is arguing and the words cannot be made out.",
      },
    ],
    exits: [{ dir: "oeste", to: "b1-puente", label: "el puente", labelGloss: "the bridge" }],
  },
];
