const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Tarifin adı
  },
  ingredients: {
    type: [String], // Birden fazla malzeme içeren bir dizi
    required: true, // Tarif için gereken malzemeler
  },
  instructions: {
    type: [String], // Adım adım talimatlar için bir dizi
    required: true, // Tarifin nasıl yapılacağına dair adım adım talimatlar
  },
  category: {
    type: String,
    required: true, // Tarifin hangi kategoriye ait olduğunu belirtir (örneğin, kahvaltı, öğle yemeği, akşam yemeği, tatlı)
  },
  prepTime: {
    type: Number, // Dakika cinsinden
    required: true, // Tarifin hazırlanma süresi
  },
  cookTime: {
    type: Number, // Dakika cinsinden
    required: true, // Tarifin pişirilme süresi
  },
  totalTime: {
    type: Number, // Dakika cinsinden
    required: true, // Hazırlık ve pişirme süresinin toplamı
  },
  servings: {
    type: Number,
    required: true, // Tarifin kaç kişilik olduğunu belirtir
  },
  nutrition: {
    calories: {
      type: Number,
      required: false,
    },
    protein: {
      type: Number,
      required: false,
    },
    fat: {
      type: Number,
      required: false,
    },
    carbohydrates: {
      type: Number,
      required: false,
    },
  },  
  author: {
    type: String,
    required: true, // Tarifi oluşturan kişi veya kaynağın adı
  },
  datePublished: {
    type: Date,
    default: Date.now, // Tarifin yayınlandığı tarih (varsayılan olarak şimdiki tarih)
  },
  image: {
    type: String,
    required: true, // Tarifin bir resmi
  },
  videoUrl: { type: String, required: true }, // Video URL alanı

  notes: {
    type: String, // Ekstra bilgiler veya öneriler
  },
  tags: {
    type: [String], // Tarifin etiketleri (örneğin, vegan, glutensiz, hızlı tarif)
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  averageRating: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Recipe", RecipeSchema);
