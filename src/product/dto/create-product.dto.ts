export class CreateProductDto {
  readonly name: string;
  readonly price: number;
  readonly count: number;
  readonly barcode: string;
  readonly categoryId: number;
  readonly barandId: number;
  readonly templateId: number;
  readonly photos: object;
}
