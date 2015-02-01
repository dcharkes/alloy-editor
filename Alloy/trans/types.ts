module trans/types

imports

	src-gen/signatures/Alloy-sig
	types-manual

type rules // references

	Ref(e) : ty
	where definition of e : ty

	FieldRef(e, f): f-ty
	where definition of f : f-ty

type rules // expressions
	
	Int(n): Int()

	Card(e): Int()
	where e : e-ty else error ["Does not have type"] on e
	
	Lt (e1, neg, e2)
+	Gt (e1, neg, e2)
+	Lte(e1, neg, e2)
+	Gte(e1, neg, e2): Boolean()
	where	e1 : e1-ty
	  and e2 : e2-ty
	  and e1-ty => Int() else error ["Expected ", Int(), " got ", e1-ty] on e1
	  and e2-ty => Int() else error ["Expected ", Int(), " got ", e2-ty] on e2
	  
	Join(e1, e2): t
	where e1 : t1
	  and e2 : t2
	  and <relation-right-type>t1 => t1r
	  and <relation-left-type>t2  => t2l
	  and t1r == t2l else error ["Expected ", t1r, " got ", t2l] on e2
	  and <relation-remove-right-type>t1 => t1'
	  and <relation-remove-left-type>t2 => t2'
	  and <relation-create> (t1', t2') => t
	
type functions

  relation-left-type: t -> t'
  where (t => Arrow(t', t2))
     or (t => t')

	relation-right-type: t -> t'
  where (t => Arrow(t1, Arrow(t2, t')))
     or (t => Arrow(t1, t'))
     or (t => t')
  
  relation-remove-left-type: t -> t'
  where (t => Arrow(t1, t'))
     or (Null() => t')
  
  // relation-remove-right-type: Arrow(t1, Arrow(t2, t3)) -> Arrow(t1, t2)
  // relation-remove-right-type: Arrow(t1, t2) -> t1
  // relation-remove-right-type: t1 -> Null()
  // relation-remove-right-type: t -> t'
  // where (t => Arrow(t1, tx) and tx => Arrow(t2, t3) and Arrow(t1, t2) => t')
  //    or (t => Arrow(t', t2))
  //    or (Null() => t')
  relation-remove-right-type: Null() -> Null() // implemented manually
  
  relation-create: (t1, t2) -> t
  where (t1 == Null() and t2 => t)
     or (t2 == Null() and t1 => t)
     or (Arrow(t1, t2) => t)

type rules // declaration expressions should be booleans

	PredExpr(e):-
	where e : e-ty
	  and e-ty => Boolean() else error ["Expected ", Boolean(), " got ", e-ty] on e

relations // subtype

	define transitive <sub:

type rules // subtype

	SigDecl(a, [s], Some(Extends(super)), c, d) :-
  where super : super-ty
    and store s <sub: super-ty

type rules // union types

	RefUnion(a, b)
+	Union(a, b): ty
	where a : a-ty
	  and b : b-ty
	  and Union(a-ty, b-ty) => ty

type rules // relation types

	Arrow(a, a-mul, b-mul, b): rel-ty
	where a : a-ty
	  and b : b-ty
	  and Arrow(a-ty, b-ty) => rel-ty

type rules