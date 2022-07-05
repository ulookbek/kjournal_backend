export class SearchArticleDto {
  title?: string;
  body?: string;
  limit?: number;
  take?: number;
  views?: 'DESC' | 'ASC';
  tags?: string;
}
