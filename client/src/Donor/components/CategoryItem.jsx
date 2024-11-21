const CategoryItem = ({ name, description, created_at }) => {
  return (
    <li>
      <div>
        <button>{name}</button>
        <p>{description}</p>
        <p>{created_at}</p>
      </div>
    </li>
  );
};
export default CategoryItem;
