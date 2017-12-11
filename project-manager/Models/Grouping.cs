using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace project_manager.Models
{
    public class Grouping<T, K>
    {
        public T Key { get; set; }
        public IEnumerable<K> Value { get; set; }
    }
}
