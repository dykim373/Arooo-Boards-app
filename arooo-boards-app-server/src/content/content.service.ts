import { Injectable, NotFoundException } from '@nestjs/common';
import { Content, QueryDto } from './type.config/custom-type';
import { contentsRawData } from './data/contents-raw-data';
import { ShownData } from './shown-data.entity';

@Injectable()
export class ContentService {
    private contentRepository: Content[] = contentsRawData;

    getAllContents(query: QueryDto) {
        /*
            문자, 음수 => NaN
            양의 실수 => 내림
        */
        const makeItNatural = (Num: number) => {
            if (Number.isNaN(Num)){
                return NaN;
            } else if (Num < 0) {
                return NaN;
            } else {
                return Math.floor(Num);
            }
        }
        const skip: number = makeItNatural(Number(query.skip));
        const limit: number = makeItNatural(Number(query.limit));

        if( skip === 0 && limit === 0 ) {
            //초기값(skip, limit = 0) 전체 배열 반환
            const shownData: ShownData[] = this.contentRepository.map( ({content, ...rest}) => rest );
            return shownData;
        } else if ( !Number.isNaN(skip) && !Number.isNaN(limit) ) {
            const cuttingData: Content[] = this.contentRepository.slice(skip, skip + limit);
            const shownData: ShownData[] = cuttingData.map( ({content, ...rest}) => rest );
            return shownData;
        } else {
            //잘못 입력(음수, 문자) 시 전체 배열 반환
            const shownData: ShownData[] = this.contentRepository.map( ({content, ...rest}) => rest );
            return shownData;
        }
    }

    getContentById(id: string) {
        const found = this.contentRepository.find(content => content.id == id);
        if(!found) {
            throw new NotFoundException(`Can't find content by ${id}`);
        }
        return found;
    }

    addContentLikes(id: string) {
        const found = this.contentRepository.find(content => content.id == id);
        if(!found) {
            throw new NotFoundException(`Can't find content by ${id}`);
        }

        const index = this.contentRepository.indexOf(found);
        found.likes += 1;
        this.contentRepository[index] = found;
        const likes = {likes: found.likes};
        return likes;
    }
}
