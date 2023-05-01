import OlbertImage from '../assets/images/quotesImages/Olbert.jpg'
import YurijImage from '../assets/images/quotesImages/Yurij.jpg'
import SeregaFImage from '../assets/images/quotesImages/SeregaF.jpg'
import SeregaMImage from '../assets/images/quotesImages/SeregaM.jpg'
import ElizabethImage from '../assets/images/quotesImages/Elizabeth.jpg'
import EgorImage from '../assets/images/quotesImages/Egor.jpg'
import AntonImage from '../assets/images/quotesImages/Anton2.jpg'
import TimofeyImage from '../assets/images/quotesImages/Timofey2.jpg'

export type QuoteRecord = {
    author: string,
    text: string,
    imageUrl: string
}


export const QuotesList: QuoteRecord[] = [
   { author: 'Сергей Ф', text: '*dies from cringe*', imageUrl: SeregaFImage },
   { author: 'Сергей М', text: 'Юра, тесты пиши!', imageUrl: SeregaMImage },
   { author: 'Olbert', text: 'Делу время, а потехе Хакс', imageUrl: OlbertImage },
   { author: 'Olbert', text: 'Не все то пончик, что коричневое', imageUrl: OlbertImage },
   { author: 'Elizabeth', text: 'За деньги - да, за деньги - да ...', imageUrl: ElizabethImage },
   { author: 'Юрий', text: 'Егоровка от Антоновки неделако падает', imageUrl: YurijImage },
   { author: 'Егор', text: '...', imageUrl: EgorImage },
   { author: 'Антон', text: '...', imageUrl: AntonImage },
   { author: 'Тимофей', text: 'они едут на Бали, а ты сидишь в подвале', imageUrl: TimofeyImage },
]
