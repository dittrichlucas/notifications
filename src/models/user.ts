import { prop, Typegoose } from 'typegoose';

class User extends Typegoose {
	@prop() name: string
	@prop() email: string
	@prop() password: string
}

export default new User().getModelForClass(User);