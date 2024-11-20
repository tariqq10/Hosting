const CategoryItem = ({ name, description, created_at }) => {
  return (
    <li>
      <div>
        <button>{name}</button>
      </div>
    </li>
  );
};
export default CategoryItem;
