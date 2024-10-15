import { conectDB } from "../server";
import db from '../config/db';

jest.mock('../config/db')

describe('connectDB', () => {
    it('should handle databse connection error', async () => {
        jest.spyOn(db, 'authenticate').mockRejectedValueOnce(new Error('Hubo un error al conectar a la base de datos'))
        const consoleSpy = jest.spyOn(console, 'log')

        await conectDB()

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Hubo un error al conectar a la base de datos')
        )
    } )
})
