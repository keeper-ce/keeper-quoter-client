
const mockImage = 'https://oir.mobi/uploads/posts/2021-06/1623333089_4-oir_mobi-p-so-snezhnim-utrom-priroda-krasivo-foto-5.jpg'
import OlbertImage from '../assets/images/quotesImages/Olbert.jpg'
import YurijImage from '../assets/images/quotesImages/Yurij.jpg'
import SeregaFImage from '../assets/images/quotesImages/SeregaF.jpg'
import SeregaMImage from '../assets/images/quotesImages/SeregaF.jpg'
import ElizabethImage from '../assets/images/quotesImages/Elizabeth.jpg'

/**
 * @type {QuoteModel[]}
 * @typedef {Object} QuoteModel
 * @property {string} author
 * @property {string} text
 * @property {string} imageUrl
 */
export const QuotesList = [
   { author: 'Сергей Ф', text: '...', imageUrl: SeregaFImage },
   { author: 'Сергей М', text: '...', imageUrl: SeregaMImage },
   { author: 'Olbert', text: 'Делу время, а потехе Хакс', imageUrl: OlbertImage },
   { author: 'Olbert', text: 'Не все то пончик, что коричневое', imageUrl: OlbertImage },
   { author: 'Elizabeth', text: '...', imageUrl: ElizabethImage },
   { author: 'Юрий', text: 'Егоровка от Антоновки не делако падает', imageUrl: YurijImage },
   { author: 'Егор', text: 'Егоровка от Антоновки не делако падает', imageUrl: YurijImage },
]