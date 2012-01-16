using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using System.Linq.Expressions;
using System.Data.Metadata.Edm;
using System.Data.Objects;

namespace WebSoft.DBO
{
    public partial class WebSoftEntities
    {
        public T GetById<T>(object id) where T : class
        {
            EntityKey key = CreateKey<T>(id);
            return (T)GetObjectByKey(key);
        }

        private EntityKey CreateKey<T>(object id)
        {
            var type = typeof(T);
            var entitySetName = MetadataWorkspace.GetEntityContainer(DefaultContainerName, DataSpace.CSpace)
                .BaseEntitySets.FirstOrDefault(bes => bes.ElementType.Name.Equals(type.Name)).Name;

            return new EntityKey(DefaultContainerName + "." + entitySetName, type.Name + "Id", id);
        }

        /// <summary>
        /// Giải pháp dùng LinQ với where s in (....)
        /// http://social.msdn.microsoft.com/forums/en-US/adodotnetentityframework/thread/095745fe-dcf0-4142-b684-b7e4a1ab59f0/
        /// </summary>
        public Expression<Func<TElement, bool>> BuildContainsExpression<TElement, TValue>(
            Expression<Func<TElement, TValue>> valueSelector, IEnumerable<TValue> values)
        {
            if (null == valueSelector)
                throw new ArgumentNullException("valueSelector");
            if (null == values)
                throw new ArgumentNullException("values");

            ParameterExpression p = valueSelector.Parameters.Single();
            if (!values.Any())
            {
                return e => false;
            }

            var equals =
                values.Select(
                    value =>
                    (Expression)Expression.Equal(valueSelector.Body, Expression.Constant(value, typeof(TValue))));

            var body = equals.Aggregate(Expression.Or);
            return Expression.Lambda<Func<TElement, bool>>(body, p);
        }
    }
}
