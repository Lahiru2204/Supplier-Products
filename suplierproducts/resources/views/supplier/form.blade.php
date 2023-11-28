<form action="{{ route('supplier.submit') }}" method="post">
    @csrf
    
    <button type="submit">Submit</button>
</form>