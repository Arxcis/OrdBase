

using OrdBase.Models;

// @doc private interface property - https://stackoverflow.com/questions/7767024/why-c-sharp-compiler-does-not-allows-private-property-setters-in-interfaces

namespace OrdBase.Services
{
    interface IDataStore
    {
    	TranslationDb Context { get; }
    }	
}
