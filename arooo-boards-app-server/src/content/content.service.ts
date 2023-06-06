import { Injectable, NotFoundException } from '@nestjs/common';
import { Content } from './content.entity';
import { contentsRawData } from './data/contents-raw-data';
import { ShownData } from './shown-data.entity';

@Injectable()
export class ContentService {
    private contentRepository: Content[] = contentsRawData;

    getAllContents(query) {
        const skip = parseInt(query.skip);
        const limit = parseInt(query.limit);

        if( !Number.isNaN(skip) && !Number.isNaN(limit) ) {
            const cuttingData: Content[] = this.contentRepository.slice(skip, skip + limit);
            const shownData: ShownData[] = cuttingData.map( ({content, ...rest}) => rest );
            return shownData;
        } else {
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
