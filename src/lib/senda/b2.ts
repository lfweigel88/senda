import type { Room } from "./types";
import { opt } from "./types";

export const B2: Room[] = [
  {
    id: "b2-plaza",
    level: "B2",
    place: "La plaza mayor",
    placeGloss: "The main square",
    word: "es importante que",
    pos: "estructura",
    gloss: "it is important that",
    example: "Es importante que hablemos.",
    exampleGloss: "It is important that we speak.",
    grammar:
      "After es importante que, Spanish wants the present subjunctive: hablemos, not hablamos. The importance judges the act; it does not report it as a fact.",
    scene:
      "La plaza está llena y casi muda. La gente discute con las manos. En el centro, un hombre mayor pide silencio y no lo consigue. Mateo no está. Su tema sí.",
    sceneGloss:
      "The square is full and almost mute. People argue with their hands. In the center, an old man calls for silence and does not get it. Mateo is not there. His subject is.",
    scrap: "Es importante que hablemos, no que hablamos. La importancia abre el modo del deseo y de la duda. —M",
    scrapGloss: "It is important that we speak, not that we are speaking. Importance opens the mood of wish and doubt. —M",
    actions: [
      {
        id: "escuchar",
        label: "Escuchar la plaza",
        labelGloss: "Listen to the square",
        text: "Alguien repite que el silencio es más seguro. Otro niega con la cabeza. Nadie completa una frase larga.",
        textGloss: "Someone repeats that silence is safer. Another shakes his head. No one finishes a long sentence.",
      },
      {
        id: "proponer",
        label: "Proponer hablar",
        labelGloss: "Propose that you all talk",
        trial: {
          prompt: "Quieres que el grupo hable con calma. No describes un hecho: lo juzgas necesario. ¿Qué dices?",
          promptGloss: "You want the group to speak calmly. You are not describing a fact: you judge it necessary. What do you say?",
          hint: "Es importante que + subjuntivo.",
          hintGloss: "Es importante que + subjunctive.",
          options: [
            opt("Es importante que hablamos con calma.", "Hablamos es indicativo. Aquí el modo es subjuntivo.", "Hablamos is indicative. Here the mood is subjunctive."),
            opt("Es importante que hablar con calma.", "Hablar es infinitivo. Después de que va una forma personal.", "Hablar is an infinitive. After que comes a personal form."),
            opt("Es importante hablemos que con calma.", "Que va entre importante y el verbo.", "Que goes between importante and the verb."),
            opt("Es importante que hablemos con calma.", "El hombre mayor baja las manos. La plaza, un momento, oye.", "The old man lowers his hands. The square, for a moment, listens.", true),
          ],
        },
      },
    ],
    exits: [{ dir: "norte", to: "b2-teatro", label: "el teatro", labelGloss: "the theater" }],
    recall: {
      prompt: "Ahora el juicio es otro: es necesario que Rosa descanse. Ella, no vosotros.",
      promptGloss: "Now the judgment is different: it is necessary that Rosa rest. She, not all of you.",
      hint: "Es necesario que + ella descanse.",
      hintGloss: "Es necesario que + she descanse.",
      options: [
        opt("Es necesario que Rosa descanse.", "Descanse: subjuntivo, tercera persona.", "Descanse: subjunctive, third person.", true),
        opt("Es necesario que Rosa descansa.", "Descansa afirma un hecho. Tú exiges un descanso.", "Descansa states a fact. You are requiring a rest."),
        opt("Es necesario que nosotros descanse.", "La persona no concuerda.", "The person does not agree."),
        opt("Es necesario Rosa que descansar.", "Ni el orden ni el infinitivo sirven.", "Neither the order nor the infinitive works."),
      ],
    },
  },
  {
    id: "b2-teatro",
    level: "B2",
    place: "El teatro",
    placeGloss: "The theater",
    word: "ojalá",
    pos: "interjección",
    gloss: "I hope / if only",
    example: "Ojalá Mateo esté bien.",
    exampleGloss: "I hope Mateo is well.",
    grammar:
      "Ojalá wants the subjunctive. A wish about the present is ojalá esté, not ojalá está. Estar bien is the idiom; ser bien is not.",
    scene:
      "El telón está a medio caer. La obra trata de una ciudad sin palabras. Una actriz se sale del texto y te busca entre las butacas.",
    sceneGloss:
      "The curtain is half down. The play is about a city without words. An actress steps out of the script and looks for you in the seats.",
    scrap: "Ojalá esté bien. Ojalá no es un hecho: es un deseo, y el deseo no usa el indicativo. —M",
    scrapGloss: "I hope he is well. Ojalá is not a fact: it is a wish, and a wish does not use the indicative. —M",
    actions: [
      {
        id: "obra",
        label: "Seguir la obra",
        labelGloss: "Follow the play",
        text: "En escena, una puerta no se abre. La actriz dice tu silencio como si fuera un personaje más.",
        textGloss: "On stage, a door will not open. The actress speaks your silence as if it were one more character.",
      },
      {
        id: "desear",
        label: "Decir el deseo",
        labelGloss: "Say the wish",
        trial: {
          prompt: "La actriz te pide un deseo sobre Mateo, ahora, no un dato. ¿Qué dices?",
          promptGloss: "The actress asks you for a wish about Mateo, now, not a fact. What do you say?",
          hint: "Ojalá + subjuntivo. Estar bien, no ser bien.",
          hintGloss: "Ojalá + subjunctive. Estar bien, not ser bien.",
          options: [
            opt("Ojalá Mateo está bien.", "Está es indicativo. Ojalá no informa: desea.", "Está is indicative. Ojalá does not report: it wishes."),
            opt("Ojalá Mateo es bien.", "Bien con personas usa estar, y ojalá pide subjuntivo.", "Bien with people uses estar, and ojalá wants the subjunctive."),
            opt("Ojalá Mateo esté bien.", "La actriz repite la frase y el telón, por fin, baja del todo.", "The actress repeats the line and the curtain, at last, comes all the way down.", true),
            opt("Ojalá está Mateo bien será.", "Sobran tiempos. Un deseo presente: esté.", "There are too many tenses. A present wish: esté."),
          ],
        },
      },
    ],
    exits: [
      { dir: "sur", to: "b2-plaza", label: "la plaza mayor", labelGloss: "the main square" },
      { dir: "este", to: "b2-cafe", label: "el café de noche", labelGloss: "the night café" },
    ],
    recall: {
      prompt: "Deseas que mañana no llueva, todavía como deseo de ahora. No afirmas el pronóstico.",
      promptGloss: "You wish it would not rain tomorrow, still as a wish from now. You are not stating the forecast.",
      hint: "Ojalá no llueva. Presente de subjuntivo con valor de futuro cercano.",
      hintGloss: "Ojalá no llueva. Present subjunctive with a near-future sense.",
      options: [
        opt("Ojalá no llueva mañana.", "El deseo usa llueva, no llueve.", "The wish uses llueva, not llueve.", true),
        opt("Ojalá no llueve mañana.", "Llueve afirma. Ojalá no afirma.", "Llueve states a fact. Ojalá does not."),
        opt("Ojalá no llover mañana.", "Después de ojalá no va el infinitivo solo.", "A bare infinitive does not follow ojalá."),
        opt("Ojalá no llovió mañana.", "El pasado no desea el mañana.", "The past does not wish for tomorrow."),
      ],
    },
  },
  {
    id: "b2-cafe",
    level: "B2",
    place: "El café de noche",
    placeGloss: "The night café",
    word: "no creo que",
    pos: "estructura",
    gloss: "I don't think that",
    example: "No creo que el silencio sea la solución.",
    exampleGloss: "I don't think silence is the solution.",
    grammar:
      "Denial flips the mood. No creo que takes the subjunctive: no creo que sea. Affirmative creo que kept the indicative. The future indicative (será) does not replace the subjunctive here.",
    scene:
      "El café cierra las luces grandes y deja las pequeñas. En una mesa, dos de la plaza siguen la discusión. Uno cree que callar arregla la ciudad. Tú no.",
    sceneGloss:
      "The café turns off the big lights and leaves the small ones. At a table, two people from the square continue the argument. One thinks staying quiet fixes the city. You do not.",
    scrap: "No creo que sea tan simple. Negar el creer invita al subjuntivo. —M",
    scrapGloss: "I don't think it is that simple. Denying belief invites the subjunctive. —M",
    actions: [
      {
        id: "mesa",
        label: "Sentarte en la mesa",
        labelGloss: "Sit at the table",
        text: "Te dejan un sitio. En el mármol hay una frase rayada: «no es tan simple», sin firma.",
        textGloss: "They make room for you. On the marble there is a scratched sentence: “it is not that simple,” unsigned.",
      },
      {
        id: "negar",
        label: "Negar la idea",
        labelGloss: "Deny the idea",
        trial: {
          prompt: "No estás de acuerdo. ¿Qué frase niega con el modo correcto?",
          promptGloss: "You disagree. Which sentence denies with the right mood?",
          hint: "No creo que + subjuntivo.",
          hintGloss: "No creo que + subjunctive.",
          options: [
            opt("No creo que el silencio es la solución.", "Es es indicativo. La negación pide sea.", "Es is indicative. The denial wants sea."),
            opt("No creo que el silencio será la solución.", "Será no sustituye al subjuntivo en esta estructura.", "Será does not replace the subjunctive in this structure."),
            opt("Creo no que el silencio sea la solución.", "No va delante de creo: no creo que.", "No goes before creo: no creo que."),
            opt("No creo que el silencio sea la solución.", "La mesa se queda quieta. Alguien apaga un cigarrillo.", "The table goes quiet. Someone puts out a cigarette.", true),
          ],
        },
      },
    ],
    exits: [
      { dir: "oeste", to: "b2-teatro", label: "el teatro", labelGloss: "the theater" },
      { dir: "norte", to: "b2-redaccion", label: "la redacción", labelGloss: "the newsroom" },
    ],
    recall: {
      prompt: "Niegan otra cosa: no creen que Mateo haya vuelto. Tú repites su frase, en presente de duda, sobre el silencio del puente.",
      promptGloss: "They deny something else. You repeat a clean present doubt about the bridge being safe.",
      hint: "No creen que + sea, ellos.",
      hintGloss: "No creen que + sea, they.",
      options: [
        opt("No creen que el puente sea seguro.", "Creen, ellos; sea, subjuntivo.", "Creen, they; sea, subjunctive.", true),
        opt("No creo que el puente sea seguro.", "Eso serías tú. La frase es de ellos: creen.", "That would be you. The sentence is theirs: creen."),
        opt("No creen que el puente es seguro.", "Después de no creen que, es pierde.", "After no creen que, es loses."),
        opt("No creen el puente que sea seguro.", "Que no se separa así del verbo.", "Que is not separated from the verb like that."),
      ],
    },
  },
  {
    id: "b2-redaccion",
    level: "B2",
    place: "La redacción",
    placeGloss: "The newsroom",
    word: "sin embargo",
    pos: "conector",
    gloss: "however",
    example: "La plaza está llena; sin embargo, nadie dice la palabra justa.",
    exampleGloss: "The square is full; however, no one says the right word.",
    grammar:
      "Sin embargo marks contrast, like however. Por ejemplo illustrates, además adds, es decir restates. None of those turn a full square into a silent one.",
    scene:
      "Vuelves a la mesa larga, de noche. El artículo de Mateo está a medias. Dos frases esperan un puente entre ellas. La directora te deja el lápiz.",
    sceneGloss:
      "You return to the long table, at night. Mateo's article is half done. Two sentences are waiting for a bridge between them. The editor leaves you the pencil.",
    scrap: "La plaza está llena; sin embargo, falta la palabra. El contraste es una bisagra, no un ejemplo. —M",
    scrapGloss: "The square is full; however, the word is missing. Contrast is a hinge, not an example. —M",
    actions: [
      {
        id: "borrador",
        label: "Leer el borrador",
        labelGloss: "Read the draft",
        text: "«La plaza está llena.» Punto. Luego un hueco. Luego: «Nadie dice la palabra justa.»",
        textGloss: "“The square is full.” A period. Then a gap. Then: “No one says the right word.”",
      },
      {
        id: "unir",
        label: "Unir las dos frases",
        labelGloss: "Join the two sentences",
        trial: {
          prompt: "«La plaza está llena. ____ nadie dice la palabra justa.» ¿Qué conector contrasta?",
          promptGloss: "“The square is full. ____ no one says the right word.” Which connector contrasts?",
          hint: "Quieres un giro: hay gente, y aun así falta la frase.",
          hintGloss: "You want a turn: there are people, and even so the sentence is missing.",
          options: [
            opt("por ejemplo", "Por ejemplo anunciaría un caso, no un contraste.", "Por ejemplo would announce an example, not a contrast."),
            opt("además", "Además suma. Aquí la segunda frase se opone a la primera.", "Además adds. Here the second sentence opposes the first."),
            opt("sin embargo", "La directora lee en voz baja y no tacha nada.", "The editor reads under her breath and crosses nothing out.", true),
            opt("es decir", "Es decir repite lo mismo con otras palabras. Esto no es lo mismo.", "Es decir restates the same thing. This is not the same thing."),
          ],
        },
      },
    ],
    exits: [
      { dir: "sur", to: "b2-cafe", label: "el café de noche", labelGloss: "the night café" },
      { dir: "este", to: "b2-archivo", label: "el archivo", labelGloss: "the archive" },
    ],
    recall: {
      prompt: "Otra pareja de frases: «Rosa cerró la posada. ____ dejó la llave bajo la maceta.» El cierre no impidió la ayuda.",
      promptGloss: "Another pair: “Rosa closed the inn. ____ she left the key under the flowerpot.” Closing did not stop the help.",
      hint: "Otra vez contraste, no suma ni ejemplo.",
      hintGloss: "Contrast again, not addition or example.",
      options: [
        opt("Sin embargo,", "Cerró, y aun así dejó la llave.", "She closed, and even so she left the key.", true),
        opt("Por ejemplo,", "La llave no es un ejemplo de cerrar.", "The key is not an example of closing."),
        opt("Es decir,", "Dejar la llave no reformula el cierre.", "Leaving the key does not restate the closing."),
        opt("Además no contrastó, porque", "Además no contrasta, y la frase se deshace.", "Además does not contrast, and the sentence falls apart."),
      ],
    },
  },
  {
    id: "b2-archivo",
    level: "B2",
    place: "El archivo",
    placeGloss: "The archive",
    word: "si tuviera",
    pos: "hipótesis",
    gloss: "if I had",
    example: "Si tuviera la llave, abriría la puerta.",
    exampleGloss: "If I had the key, I would open the door.",
    grammar:
      "An unreal present uses si + imperfect subjunctive, then the conditional: si tuviera, abriría. Si tendría is the classic error. The imperfect subjunctive is tuviera or tuviese, not tuve.",
    scene:
      "El archivo guarda planos de la ciudad. En uno, una puerta interior no tiene número. La llave dibujada está tachada. Tú no la tienes. La frase, entonces, no puede ser real.",
    sceneGloss:
      "The archive keeps plans of the city. On one, an inner door has no number. The drawn key is crossed out. You do not have it. The sentence, then, cannot be real.",
    scrap: "Si tuviera la llave, abriría. No la tengo. Por eso el condicional, no el presente. —M",
    scrapGloss: "If I had the key, I would open it. I do not have it. That is why the conditional, not the present. —M",
    actions: [
      {
        id: "plano",
        label: "Mirar el plano",
        labelGloss: "Look at the plan",
        text: "La puerta sin número da a una sala marcada solo con tinta oscura. Al margen: «si».",
        textGloss: "The unnumbered door leads to a room marked only in dark ink. In the margin: “si.”",
      },
      {
        id: "hipotesis",
        label: "Decir la hipótesis",
        labelGloss: "State the hypothesis",
        trial: {
          prompt: "No tienes la llave. Imaginas el presente al revés. ¿Qué frase es correcta?",
          promptGloss: "You do not have the key. You imagine the present otherwise. Which sentence is correct?",
          hint: "Si + imperfecto de subjuntivo, y condicional en la otra mitad.",
          hintGloss: "Si + imperfect subjunctive, and conditional in the other half.",
          options: [
            opt("Si tendría la llave, abriera la puerta.", "Tendría no va después de si. El condicional es la consecuencia, no la condición.", "Tendría does not go after si. The conditional is the result, not the condition."),
            opt("Si tuve la llave, abriría la puerta.", "Tuve es pretérito. La hipótesis irreal pide tuviera.", "Tuve is pretérito. The unreal hypothesis wants tuviera."),
            opt("Si tuviera la llave, abriría la puerta.", "El plano no se abre. La frase, sí.", "The plan does not open. The sentence does.", true),
            opt("Si tuviera la llave, abro ayer la puerta.", "Abro es presente y ayer lo contradice. La consecuencia es abriría.", "Abro is present and yesterday contradicts it. The result is abriría."),
          ],
        },
      },
    ],
    exits: [
      { dir: "oeste", to: "b2-redaccion", label: "la redacción", labelGloss: "the newsroom" },
      { dir: "norte", to: "b2-repaso", label: "el foyer", labelGloss: "the foyer" },
    ],
    recall: {
      prompt: "Otra hipótesis, también irreal: si Rosa estuviera aquí, diría la verdad. No está.",
      promptGloss: "Another hypothesis, also unreal: if Rosa were here, she would tell the truth. She is not.",
      hint: "Si estuviera, diría.",
      hintGloss: "Si estuviera, diría.",
      options: [
        opt("Si Rosa estuviera aquí, diría la verdad.", "Imperfecto de subjuntivo + condicional.", "Imperfect subjunctive + conditional.", true),
        opt("Si Rosa estaría aquí, decía la verdad.", "Estaría no entra en la cláusula con si.", "Estaría does not enter the si clause."),
        opt("Si Rosa está aquí, diría la verdad.", "Está presenta un hecho. Ella no está.", "Está presents a fact. She is not here."),
        opt("Si Rosa estuvo aquí, dirá la verdad.", "Eso mezcla pasado real y futuro, no una hipótesis de ahora.", "That mixes real past and future, not a hypothesis about now."),
      ],
    },
  },
  {
    id: "b2-repaso",
    level: "B2",
    place: "El foyer",
    placeGloss: "The foyer",
    word: "repaso",
    pos: "sustantivo",
    gloss: "review",
    example: "En el foyer el repaso es en voz baja.",
    exampleGloss: "In the foyer the review is under one's breath.",
    grammar: "The subjunctive and the conditional fade if you only met them once. The foyer asks again, in other rooms' clothes.",
    scene:
      "Alfombra roja, luces bajas, ninguna obra en cartel. El foyer guarda las frases difíciles hasta que las dices sin el cuarto delante.",
    sceneGloss:
      "Red carpet, low lights, no play on the bill. The foyer keeps the difficult sentences until you say them without the room in front of you.",
    scrap: "Los del ateneo hablan como libros. No imites el ruido: busca el matiz. —M",
    scrapGloss: "The people at the athenaeum talk like books. Do not imitate the noise: look for the shade of meaning. —M",
    review: true,
    actions: [
      {
        id: "butaca",
        label: "Sentarte en una butaca",
        labelGloss: "Sit in a seat",
        text: "La butaca está vacía desde hace tiempo. En el respaldo, con lápiz: «no obstante».",
        textGloss: "The seat has been empty for a long time. On the back, in pencil: “no obstante.”",
      },
    ],
    exits: [{ dir: "sur", to: "b2-archivo", label: "el archivo", labelGloss: "the archive" }],
  },
];
