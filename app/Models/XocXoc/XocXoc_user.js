let Schema = new mongoose.Schema({
	uid:    {type: String, required: true, unique: true},
	bet:    {type: Number, default: 0},
	win:    {type: Number, default: 0, index: true},
	lost:   {type: Number, default: 0, index: true},
	totall: {type: Number, default: 0, index: true},
});
