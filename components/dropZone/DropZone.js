function DropZone({name, description, model, image}) {
  return (
    <div className='root'>
      Drop Zone
      <style jsx>{`
        .root{
          width: 300px;
          height: 400px;
          margin: 0 5px;
        }
      `}</style>
    </div>
  );
};

export default DropZone
