package finalProject.dishcoveryServer.models.Recipe;

public class Recipe {
    
    private int recipeId;
    private String title;
    private String image; 
    private int readyInMinutes;
    private int servings;
    private String mainCourse;
    private String summarize;

    private Ingredients[] ingredients;
    

    //Detailed Information for recipe page 
    


    // ingredients: [
    //     {name: "spaghetti", amount: 8, unit: "ounces"},
    //     {name: "bacon", amount: 4, unit: "slices"}
    // ],
    // instructions: [
    //     {step: 1, description: "Boil pasta according to package directions..."},
    //     {step: 2, description: "Meanwhile, cook bacon in large skillet..."}
    // ],
    // nutrition: {
    //     calories: 450,
    //     protein: 22,
    //     carbs: 56,
    //     fat: 14
    // }

}
