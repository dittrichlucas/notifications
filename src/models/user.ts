import { prop, Typegoose } from 'typegoose';

type Session = {
	token: string
	userAgent?: string
	ipAddress?: string
}

class User extends Typegoose {
	@prop() name: string
	@prop() email: string
	@prop() password: string
	@prop() sessions: Session[]
}

export default new User().getModelForClass(User);