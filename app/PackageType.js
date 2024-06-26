const PackageType = (props = {}) => {
  const { name, onSelectingPackageType, selectedPackageType } = props;

  return (
    <div className={`text-[#4f4f4f] mr-4 my-2 rounded-md shadow bg-white hover:bg-[#f0f5f5] ${selectedPackageType === name ? 'mr-6 ml-2 transform transition-transform duration-500 scale-125 border-solid border-2 border-[#1778f2] text-[#1778f2]' : ''}`}>
      <p className="text-[13px] text-black pl-[15px] pr-[15px] pt-[5px] pb-[5px] py-5" onClick={() => onSelectingPackageType(name)}>{name}</p>
    </div>
  )
}

export default PackageType