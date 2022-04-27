import { MaybeDocument } from 'nano';

export interface IMovie extends MaybeDocument {
	name: string;
	genre: string;
	castsId: string[];
	directorId: string[];
	stars: number;
	country: string;
}
