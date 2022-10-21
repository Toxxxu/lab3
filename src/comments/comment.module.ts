import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comments } from './comments.entity';
import { Posts } from 'src/posts/posts.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Comments, Posts])],
    controllers: [CommentsController],
    providers: [CommentsService],
    exports: [CommentsService],
})
export class CommentModule { }