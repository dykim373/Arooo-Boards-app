import { Injectable } from '@nestjs/common';
import { BoardRepository } from './app.repository';
import { Board } from './board.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateBoardDto } from './create-board.dto';

@Injectable()
export class AppService {
    constructor(
        private boardRepository: BoardRepository
    ) {}

    async getAllContents(): Promise<string> {
        return 'Hello World!';
    }

    async getContent(): Promise<string> {
        return 'Hello World!';
    }

    async createContent(createBoardDto: CreateBoardDto): Promise<Board> {
        const boardId = uuidv4();
        const board: Board = this.boardRepository.create({
            title: createBoardDto.title,
            content: createBoardDto.content,
            likes: 0,
            id: boardId
        })
        this.boardRepository.save(board);
        return board;
    }

    async patchNumberOfLikes(): Promise<string> {
        return 'Hello World!';
    }
}
