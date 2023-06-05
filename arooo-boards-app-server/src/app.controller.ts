import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Board } from './board.entity';
import { CreateBoardDto } from './create-board.dto';

@Controller("/library/content")
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getAllContents(): Promise<string> {
        return this.appService.getAllContents();
    }

    @Get("/:contentId")
    getContent(): Promise<string> {
        return this.appService.getContent();
    }

    @Post()
    createContent(
        @Body() createBoardDto: CreateBoardDto
    ): Promise<Board> {
        return this.appService.createContent(createBoardDto);
    }

    @Post("/:contentId/like")
    patchNumberOfLikes(): Promise<string> {
        return this.appService.patchNumberOfLikes();
    }
}
