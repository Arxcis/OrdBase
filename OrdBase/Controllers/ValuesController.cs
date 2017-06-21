using System.Collections.Generic;
using System.Web.Http;

namespace OrdBase.Controllers
{
    // @doc Return JSON strings - https://stackoverflow.com/questions/35937118/build-json-response-in-web-api-controller
    // @doc Attribute routing - https://docs.microsoft.com/en-us/aspnet/web-api/overview/web-api-routing-and-actions/attribute-routing-in-web-api-2
    [RoutePrefix("api/values")]
    public class ValuesController : ApiController
    {
        [Route("")]
        public IEnumerable<string> GetAll()
        {
            return new string[] { "value1", "value2" };
        }

        [Route("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        [Route("")]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete]
        public void Delete(int id)
        {
        }
    }
}
