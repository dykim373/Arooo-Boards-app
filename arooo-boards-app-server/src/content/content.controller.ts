import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Content, QueryDto } from './type.config/custom-type';
import { ContentService } from './content.service';
import { ShownData } from './shown-data.entity';

@Controller('library/content')
export class ContentController {
    constructor(private contentService: ContentService) {}

    @Get()
    getAllContents(
        @Query() query: QueryDto
    ): ShownData[] {
        return this.contentService.getAllContents(query);
    }

    @Get("/:contentId")
    getContentById(
        @Param("contentId") id: string
    ): Content {
        return this.contentService.getContentById(id);
    }

    @Post("/:contentId/like")
    addContentLikes(
        @Param("contentId") id: string
    ): { likes: number } {
        return this.contentService.addContentLikes(id);
    }
}
