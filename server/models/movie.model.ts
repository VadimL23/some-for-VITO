import { DocumentInsertResponse, DocumentResponseRow } from 'nano';
import nano, { ServerScope } from 'nano';
import { IMovie } from '../interfaces';

export class Movie implements IMovie {
	_id: string = undefined;

	_rev: string = undefined;

	name: string;

	genre: string;

	castsId: string[];

	directorId: string[];

	stars: number;

	country: string;

	nano: ServerScope;

	// eslint-disable-next-line no-use-before-define
	_list: Movie[];

	get list(): Movie[] {
		return this.list;
	}

	set add(item: Movie) {
		this._list.push(item);
	}

	async getById(id: string): Promise<IMovie> {
		return (await this.nano.use('db').get(id)) as unknown as IMovie;
	}

	async getAll(): Promise<IMovie[] | DocumentResponseRow<IMovie>[]> {
		const docs: IMovie[] | DocumentResponseRow<IMovie>[] = await this.nano
			.use<IMovie>('db')
			.list()
			.then(async (resp) => await resp.rows);
		return docs;
	}

	constructor(doc?: Partial<Omit<IMovie, '_rev'>>) {
		if (doc) {
			const { name, genre, castsId, directorId, stars, country } = doc;
			this.name = name;
			this.genre = genre;
			this.castsId = castsId;
			this.directorId = directorId;
			this.stars = stars;
			this.country = country;
		}
		this.nano = nano(process.env.DB_URI || 'http://admin:password@localhost:5984');
	}

	processAPIResponse(response: DocumentInsertResponse) {
		if (response.ok === true) {
			this._id = response.id;
			this._rev = response.rev;
		}
	}
}
